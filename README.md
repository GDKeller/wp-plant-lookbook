# Plants Lookbook WordPress Suite

## Overview

Live site: [https://plants.grantkeller.dev/](https://plants.grantkeller.dev/)

This is a matching theme and plugin that provide custom WordPress Gutenberg blocks that serve to create an editorial "lookbook" about botanical subjects, focued on plant species and biomes.


## Context
Everything in this repo was created from scratch for submission. I set out with an imaginary client in mind -- a digital magazine that writes botany-focused content.

In working with past clients, making the editor easier to use for staff content creators/editors has been a high-priority goal. In my experience, taking the time to ensure Gutenberg blocks in the editor look and behave like they will on the front-end is worth the effort. I set out to make the editor experience as intuitive as possible, allowing for a truly visual editing experience.

I've learned that relying on editors to remember certain "rules" (like heading heirarchy) or giving them too many granular details (like color pickers) can be a significant impediment to their experience. As I've done on previous projects, here I've utilized `theme.json` to restrict the color palette and limit some block options. I've also ensured that heading heirarchy, element ordering and basic accessibility are built into the rendering of the blocks. This is intended to make it essentially impossible for an editor to make a "bad choice", and gives them the freedom to focus on making great content.


## Rationale
As my career has progressed and I've had opportunities to architect enterprise-scale digital properties, I've learned that solid fundamentals are more worthwhile than flashy visible tricks. I've chosen to focus on codebase structure, build tooling setup, encapsulation, code consistency and readability for this project. As I add to this theme/plugin combo in the future, there's a lot of room to enhance the design and buil more blocks, patterns, and reusable components. It currently stands as a strong foundation to extend.


## Things I'd Change:
- Eliminate redundancy in stylesheets for both editor and frontend.
- Expand color palette to include utility tints and shades of theme colors.
- Plan and develop robust Information Architecture for mock content (taxonomies, categories, menu heirarchy, etc).
- Build an eye-catching home hero block.
- Build custom header with fully accessible menu.
- Build custom footer with more standard information.
- Incorporate GSAP on-scroll animations to bring blocks and other elements to life as the user interacts with the page.




## Project Organization

I've oped to include both the plugin and theme in this one repo for convenience. They have seperate build processes, with individual (but very similar) Webpack configs. Source code is in `src` folders and written in Typescript and SCSS, and is bundled into `dist` folders as JS and CSS files.

---

## Build Steps

To build locally, `cd` to plugin and theme directories and run:  
`npm ci` to install packges  
`npm run build` to build files

Optionally, run `npm run watch` to continue to build files as they are changed.