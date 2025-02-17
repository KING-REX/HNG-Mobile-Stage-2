# 📱 Country Info Mobile App

## 📌 Overview

This mobile application allows users to explore a list of countries, view detailed information about each country (such as states, country code, flag, and capital), and switch between light and dark themes. The app is deployed on Appetize.io for online testing.

## 🚀 Features

### 🌍 Country List

-   Fetches and displays a list of countries from a REST API.
-   Provides a scrollable list of countries.
-   Includes a **search bar** to filter countries by name.

### 📖 Country Details

When a country is selected, the app displays:

-   **Name**
-   **States/Provinces** (if available)
-   **Flag** (image)
-   **Population**
-   **Capital city**
-   **Current President** (if available)
-   **Continent**
-   **Country Code**

### 🎨 Theme Customization

-   Users can switch between **light** and **dark** modes.
-   The theme applies across the entire app, including background, text, and buttons.

### 📱 App Deployment

-   The app is deployed to [Appetize.io](https://appetize.io/app/b_x5zc66dqyceu56tova7xhwxcxa) for easy online access.

## 🖌 UI Design

The design follows the Figma sample provided for the task.

### 🏠 Home Screen:

-   Displays a list of countries.
-   Includes a **search bar** for filtering countries.
-   A **theme toggle** button for switching between light and dark themes.

### 📍 Country Details Screen:

-   Displays country information (name, flag, country code, capital, etc.).
-   Shows states/provinces (if applicable).
-   A **back button** to return to the country list.
-   A **theme toggle switch** in the header to switch themes.

### 📏 Responsive Design:

-   The app adjusts to different screen sizes for an optimal user experience.

## 🛠️ Tech Stack & Dependencies

-   **React Native** (Expo or CLI)
-   **REST API** for fetching country data
-   **Context API / Redux** for state management (if applicable)
-   **React Navigation** for navigation between screens
-   **Styled Components / NativeWind** for styling
-   **AsyncStorage / MMKV** for persisting theme preference
-   **Appetize.io** for deployment

## 📂 Project Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/KING-REX/HNG-Mobile-Stage-2.git
cd HNG-Mobile-Stage-2
```

### 2️⃣ Install Dependencies

For projects using Expo:

```sh
npm install  # or yarn install
```

For React Native CLI projects:

```sh
npx react-native install
```

### 3️⃣ Run the App

For Expo:

```sh
npx expo start
```

For React Native CLI:

```sh
npx react-native run-android  # for Android
npx react-native run-ios      # for iOS
```

### 4️⃣ Deploy to Appetize.io

1. Build the project using:

```sh
eas build -p android --profile preview # for Android
eas build -p ios --profile preview     # for iOS
```

2. Upload the generated `.apk` or `.app` file to [Appetize.io](https://appetize.io).

## 👥 Contribution Guide

-   Fork the repository.
-   Create a new branch.
-   Make changes and test thoroughly.
-   Submit a pull request.

## 📜 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](https://github.com/KING-REX/HNG-Mobile-Stage-2/blob/master/LICENSE) file for details.
