# SocialNest Project Documentation

## Introduction

### Project Overview

"SocialNest" is an open-source platform designed to explore and visualize the complex web of social connections, highlighting the impact of social networks on various aspects of modern life. It utilizes advanced graph technologies and interactive data visualizations to offer users a profound insight into the structure and dynamics of their social worlds.

### Concept and Theoretical Background

Drawing inspiration from theories like the "Six Degrees of Separation" and "Jewish Geography," SocialNest aims to visually represent the interconnected nature of social communities.

## Technical Overview

"SocialNest" leverages Neo4j for its database for handling complex relationships and queries . The frontend employs JavaScript libraries like D3.js for dynamic and interactive visualizations.

## Design Philosophy

"SocialNest" adopts a minimalist design inspired by "TheyRule." The interface is clean with a white color scheme to keep the focus on user interactions and data exploration. The logo and naming reflect the platform's aim to map out social connections akin to a nest representing home, warmth, and community.

## How It Works

### Starting the Server

1. Open your terminal or command prompt.
2. Navigate to the project directory "Server".
3. Run the command:
   node index.js

### Launching the Client

1. Open a new terminal or command prompt window.
2. Navigate to the client directory "SocialNestClient".
3. Run the command:
   npm start
4. When prompted to host on another port, type `yes`.

### Environment Configuration

Ensure a `.env` file is present in the project root containing necessary configurations:
NEO_USER=
NEO_PASS=
NEO_URI=

## References

- Karínthy, F. (1929). Chains. In Everything is Different. Budapest: Atheneum.
- Maslow, A. H. (1943). A theory of human motivation. Psychological Review, 50(4), 370.
- Wellman, B., & Berkowitz, S. D. (Eds.). (1988). Social structures: A network approach. Cambridge University Press.
- Sheskin, Ira M., and Arnold Dashefsky. "‘Jewish Geography’ in the United States: A Spatial Analysis of the 2015 Jewish Community Study Data." Contemporary Jewry, vol. 35, no. 2, 2015, pp. 123-145.
