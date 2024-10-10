# Self-Driving Cars Course Repository

## Overview

This repository contains materials and code for the Self-Driving Cars course, focusing on computer vision techniques used in autonomous vehicles. The code provided includes various algorithms and simulations designed to help understand the principles behind self-driving technology.

## Testing and Implementation

I have tested this repository while following the course materials and have made modifications to the codebase as part of the learning process. Below is a detailed description of my activities and the changes I implemented in the computer vision section.

### Steps Taken

1. **Initial Setup**:
   - I navigated to the computer vision section of the repository located at:  
     `Self-Driving-Cars-Course/2_computer_vision`.

2. **Image Thresholding**:
   - I ran the file `1_image_threshold.py` and utilized the Python debugger to understand how the thresholding operation works. This helped me grasp how images can be processed to identify specific features, such as the road markings.

3. **Webots Simulation**:
   - I opened Webots by double-clicking the file `Self-Driving-Cars/words/city.wbt` to visualize the simulation environment for the self-driving car.

4. **Camera PID Control**:
   - I executed the `2_camera_pid.py` file as-is to ensure that everything was working correctly. Understanding the logic behind the PID (Proportional, Integral, Derivative) control was crucial for implementing effective steering strategies in the vehicle.

5. **Modifying Utility Functions**:
   - I navigated to the file `2_computer_vision/utils.py` and modified the function `calculate_normalized_average_col`. I removed the original content and prepared for implementation:
   ```python
   def calculate_normalized_average_col(binary_image):
       # TODO: implementation it
       return normalized_column, int(average_column)
