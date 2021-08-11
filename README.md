# Film Lookup

## Project description
This project changed directions a lot over the past week, mostly to accomodate for the Guardian's often weak system of metadata when it comes to archiving their film articles.
The current goal is this: 
A user should be able to search for a film, and see a series of thumbnails of movies that match the search input.
After clicking one of the thumbnails, a larger overview of the film should appear below the thumbnail gallery, giving an overview of the film, and any pertinent information.
Below that, a small list of guardian film articles tagged with the film title are displayed. Due to the extremely shaky film coverage (as well as the incomplete archiving of the Guardian's old movie reviews, it was decided that both Saira and Sasha would work primarily on TMDB's API, both trying to access different information using different fetch lookups.
** EDIT The guardian's API sucks, we've switched to the New York Times**

## User stories
 - A user should be able to search for a movie and see a list of thumbnails made up of the results.
 - A user should be able to click on these thumbnails, and see enough information to decide whether they want to see the film or not.
 - A user should be able to access the Guardian's coverage on the highlighted film at the bottom of the page

### Stage one, stretch (E2?)
- [ ] Show indication that data is loading
- [ ] Error alers
