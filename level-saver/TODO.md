# TODOs
- fix code duplicate like formData declared in types.ts and page.tsx etc.
- fix upper case for scramble words.
- [VERCEL] add option to save it in like google drive since local save it not allowed in vercel.
    - Added option to save in google drive. [DONE]
    - Add blob storage to save levels. [DONE]
    - Add option to save "loop the loop" from puzzle page.
    - Add option to save the sudoko grid from puzzle page.
    - change google drive save option, let primary option be blob storage.
      remove drive save as primary option.
      provide export to google drive option which will export all levels to google drive. saving each level to drive is painful
        provide more options of naming the file and selecting directory.
    - verify the site is working on mobile, make it responsive if needed.
    - fix the spellathon hexagon has a lot of space on the bottom, either padding or margin or height is incorrect.
    - update options to read, add, update and delete
    - remove file save feature as it doesn't work on webserver like vercel.
    - move sign-in to google to home page. validate before going to next step
    - ensure whole thing works even when deployed to vercel, save secrets in vercel environments.

## Done
- add option to save answers, they can be just plaintext.