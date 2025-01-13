# News Aggregate Challenge App

## Introduction

Welcome to the **News Aggregate Challenge** application documentation. This project is a comprehensive news aggregator built with **React.js** and **TypeScript**, leveraging **Redux Toolkit** for state management, **React Router** for navigation. The application integrates multiple news sources to provide users with a personalized and seamless news reading experience across both desktop and mobile devices.

## UI/UX Inspiration

- The user interface and user experience design are inspired by **Flipboard**, focusing on a clean, magazine-like layout that enhances readability and navigation.

## Key Features

### Categories Navigation

- **Dynamic Category Selection**: Users can effortlessly navigate through various news categories such as News, Sports, Entertainment, Technology, and customize their feeds.
- **Persistent State Management**: Utilizes [`CategoryEnum`](src/types/types.ts) and Redux to maintain the selected category across sessions.
- **Responsive Design**: Ensures seamless navigation on both desktop and mobile devices with a mobile-first approach.
- **Smooth Transitions**: Implements smooth transitions and animations for category changes, enhancing user experience.

### Filtration Based on Sources and Categories

- **Source Filtering**: Users can filter articles based on selected sources like **NewsAPI**, **The Guardian**, and **NYT API**.
- **Category Filtering**: Allows filtering articles within specific categories for a more tailored news feed.
- **Advanced Filter Combinations**: Implemented via [`FilterModal`](src/components/common/FilterModal/FilterModal.tsx) for enhanced filtering options, enabling users to combine multiple filters.
- **Real-Time Filter Updates**: Filters are applied in real-time, providing instant feedback and updated article lists.

### Customize Feed

- **Personalized Content**: Users can customize their news feed by selecting preferred sources, categories, and authors, ensuring content relevancy.
- **Preference Management**: Preferences are managed and persisted using Redux, maintaining a tailored news experience across sessions.
- **Smart Content Deduplication**: Prevents duplicate articles from appearing in the feed, ensuring a clean and diverse content display.
- **Multiple Source Selection**: Enables users to select multiple news sources simultaneously for a comprehensive news feed.

### Search

- **Debounced Search Implementation**: Utilizes the [`useSearch`](src/hooks/useSearch.ts) hook to handle efficient searching, reducing unnecessary API calls.
- **Real-Time Results**: Provides instant search results as users input their queries, enhancing responsiveness.
- **Search History Management**: (TODO) Planned feature to allow users to revisit their previous searches.

### Load More

- **Infinite Scrolling**: Implements infinite scroll to load more articles as the user reaches the end of the current list, ensuring a continuous browsing experience.
- **Pagination Handling**: Manages article pagination seamlessly, coordinating with API responses to fetch additional data.
- **Loading State Management**: Provides visual feedback during the loading of additional articles, enhancing user awareness.
- **Error Handling**: Gracefully handles errors that may occur during data fetching, informing users appropriately.
- **Rate Limiting Consideration**: Incorporates strategies to handle API rate limits, ensuring the application remains functional under heavy usage.

### Skeleton Loading

- **Progressive Loading UI**: Uses [`ArticleSkeleton`](src/components/features/articles/ArticleSkeleton.tsx) to display placeholder content while articles are being fetched, maintaining layout consistency.
- **Smooth Transitions**: Ensures a smooth user experience during loading states with subtle animations.
- **Fallback States**: Provides fallback UI in case of loading failures, ensuring users are informed and can retry actions.
- **Placeholder Components**: Implements reusable placeholder components to standardize the loading experience across different sections of the app.

### API Integration

- **Multiple News Sources**: Integrates **NewsAPI**, **NYT API**, and **The Guardian API** to fetch a diverse range of articles.
- **Rate Limiting Handling**: Implements strategies to handle API rate limits, especially for **NYT API** with stricter limitations, ensuring continuous service without disruptions.
- **Error Management**: Provides robust error handling mechanisms for API failures, notifying users and preventing application crashes.
- **Data Normalization**: Standardizes data fetched from different APIs into a consistent [`Article`](src/types/types.ts) type, facilitating easier data management and display.
- **Cache Implementation**: (TODO) Planned enhancement to implement caching strategies to reduce redundant API calls and improve performance.

## Article List Screen

### Key Features

- **Detailed Article Information**: Presents comprehensive information about each article, including the title, source, author, publication time, image, likes, comments, and shares, ensuring users have all necessary details at a glance.
- **Add to Favorites (TODO)**: Allows users to mark articles as favorites, enabling quick access to preferred content.
- **Responsive Layout**: Ensures the article list is fully responsive, providing an optimal viewing experience across various device sizes.
- **Efficient Rendering**: Utilizes React's memoization techniques to optimize rendering performance, especially with large lists of articles.

## Design Pattern

### Container/Presentational Components
**Description:** Separates components into containers that handle data fetching and state management, and presentational components that focus solely on rendering the UI.

### Custom Hooks
**Description:** Encapsulates reusable stateful logic into custom hooks such as `useArticles` and `useSearch`.

### Redux Toolkit for State Management
**Description:** Utilizes Redux Toolkit's slices and async thunks for efficient and scalable state management.

### Service Layer for API Integration
**Description:** Abstracts API interactions through a dedicated service layer with separate API client files.

### Memoization for Performance Optimization
**Description:** Implements `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders and optimize performance.

### Skeleton Loading Pattern
**Description:** Utilizes placeholder components like `ArticleSkeleton` to indicate loading states to users.

### Modular Architecture
**Description:** Organizes the codebase into feature-based modules such as `components`, `hooks`, `api`, and `store`.

### TODO:
Testing and some optimzzation are still left due to time constraints


### Environment File

Please make sure to add an `.env` file in the root folder of the project. This file should contain necessary environment variables, particularly for APIs to function properly.


