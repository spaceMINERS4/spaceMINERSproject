import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from datetime import datetime
from mpl_toolkits.mplot3d import Axes3D

# Load the dataset
df = pd.read_csv("convertcsv.csv")

# Extract relevant orbital parameters into a new DataFrame
relevant_columns = [
    'object', 'epoch_tdb', 'tp_tdb', 'e', 'i_deg', 'w_deg', 
    'node_deg', 'q_au_1', 'q_au_2', 'p_yr', 'moid_au', 'ref'
]
celestial_df = df[relevant_columns]

# Clean the data: drop rows with missing values
celestial_df = celestial_df.dropna()

# Set the number of objects to animate
num_objects = 10
if num_objects > len(celestial_df):
    num_objects = len(celestial_df)
celestial_df = celestial_df.iloc[:num_objects]

# Function to convert degrees to radians
def deg_to_rad(deg):
    return deg * (np.pi / 180)

# Kepler's Equation Solver for Eccentric Anomaly
def solve_kepler(M, e, tol=1e-6):
    E = M
    while True:
        delta_E = (M - (E - e * np.sin(E))) / (1 - e * np.cos(E))
        E += delta_E
        if abs(delta_E) < tol:
            break
    return E

# Function to propagate the orbit and get position at time t
def propagate_orbit(e, a, ma, n, t):
    M_t = ma + n * t  # Mean anomaly at time t (radians)
    E_t = solve_kepler(M_t, e)  # Solve for Eccentric Anomaly
    true_anomaly = 2 * np.arctan2(np.sqrt(1 + e) * np.sin(E_t / 2), np.sqrt(1 - e) * np.cos(E_t / 2))
    r = a * (1 - e * np.cos(E_t))  # Orbital radius
    return r, true_anomaly

# Function to calculate 3D position
def celestial_position_3d(e, a, ma, n, omega, Omega, inclination, days_passed):
    t = days_passed / 365.25  # Convert to years
    r, true_anomaly = propagate_orbit(e, a, ma, n, t)
    x_orbital = r * np.cos(true_anomaly)
    y_orbital = r * np.sin(true_anomaly)

    # Rotate the orbital plane by omega, inclination, and Omega
    omega_rad = deg_to_rad(omega)
    Omega_rad = deg_to_rad(Omega)
    inclination_rad = deg_to_rad(inclination)

    x_prime = x_orbital * np.cos(omega_rad) - y_orbital * np.sin(omega_rad)
    y_prime = x_orbital * np.sin(omega_rad) + y_orbital * np.cos(omega_rad)
    z_prime = 0

    x_rot = x_prime
    y_rot = y_prime * np.cos(inclination_rad) - z_prime * np.sin(inclination_rad)
    z_rot = y_prime * np.sin(inclination_rad) + z_prime * np.cos(inclination_rad)

    x_final = x_rot * np.cos(Omega_rad) - y_rot * np.sin(Omega_rad)
    y_final = x_rot * np.sin(Omega_rad) + y_rot * np.cos(Omega_rad)

    return x_final, y_final, z_rot

# Set today’s date as the reference
today = datetime(2024, 10, 6)
julian_day_offset = 2451545  # Julian Day for 2000-01-01

# Calculate today's Julian Date
today_julian = 2451545 + (today - datetime(2000, 1, 1)).days

# Calculate the time difference between today's Julian date and the comet's epoch
time_diff_years = (today_julian - celestial_df['epoch_tdb']) / 365.25
mean_motion_arr = (2 * np.pi) / celestial_df['p_yr']
celestial_df['mean_anomaly_at_today'] = mean_motion_arr * time_diff_years

# Prepare the figure for animation
fig = plt.figure()
ax = plt.axes(projection='3d')
ax.set_xlim(-10, 10)
ax.set_ylim(-10, 10)
ax.set_zlim(-10, 10)
ax.set_xlabel('X (AU)')
ax.set_ylabel('Y (AU)')
ax.set_zlabel('Z (AU)')
ax.set_title('Celestial Bodies Motion Animation')

# Initialize the scatter plot for celestial bodies
scat = ax.scatter([], [], [], s=10)

# Draw the orbits for each celestial body and create a text label for each
text_labels = []
for index, row in celestial_df.iterrows():
    e = row['e']
    q = row['q_au_1']  # Perihelion distance
    a = q / (1 - e)  # Semi-major axis
    n = 2 * np.pi / row['p_yr']  # Mean motion
    omega = row['w_deg']  # Argument of perihelion
    Omega = row['node_deg']  # Longitude of ascending node
    inclination = row['i_deg']  # Inclination

    # Create 100 points around the orbit for plotting
    orbit_anomalies = np.linspace(0, 2 * np.pi, 100)

    # Calculate the orbit path
    x_orbit, y_orbit, z_orbit = [], [], []
    for anomaly in orbit_anomalies:
        r, true_anomaly = propagate_orbit(e, a, anomaly, n, 0)  # For a full orbit, use t=0
        x, y, z = celestial_position_3d(e, a, anomaly, n, omega, Omega, inclination, 0)
        x_orbit.append(x)
        y_orbit.append(y)
        z_orbit.append(z)

    # Plot the orbit in 3D
    ax.plot(x_orbit, y_orbit, z_orbit, 'lightgrey', alpha=0.5)

    # Create a text label for the celestial body
    text = ax.text(0, 0, 0, row['object'], color='blue')  # Default position will be updated later
    text_labels.append(text)

# Animation function
def update(frame):
    x_data, y_data, z_data = [], [], []
    
    for idx, row in celestial_df.iterrows():
        e = row['e']
        q = row['q_au_1']  # Perihelion distance
        a = q / (1 - e)  # Semi-major axis
        ma = row['mean_anomaly_at_today']  # Use today's mean anomaly
        n = 2 * np.pi / row['p_yr']  # Mean motion
        Omega = row['node_deg']  # Longitude of ascending node
        omega = row['w_deg']  # Argument of perihelion
        inclination = row['i_deg']  # Inclination

        # Calculate position
        x, y, z = celestial_position_3d(e, a, ma, n, omega, Omega, inclination, frame)
        x_data.append(x)
        y_data.append(y)
        z_data.append(z)

        # Update text label positions
        text_labels[idx].set_position((x, y, z + 0.5))  # Offset the text slightly above the comet

    # Update scatter plot data
    scat._offsets3d = (x_data, y_data, z_data)
    return scat, *text_labels  # Return updated scatter and text labels

# Create the animation
duration_days = 3000  # Total animation duration
ani = FuncAnimation(fig, update, frames=range(duration_days), blit=False, interval=200)

# Show the animation
plt.show()
