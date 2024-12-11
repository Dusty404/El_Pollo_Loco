class DrawableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
    * Draws the image on the canvas at the object's current position.
    * 
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
    * This method uses `ctx.drawImage` to draw the image at the object's position (`x`, `y`), 
    * scaled to the object's width and height.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an image from the specified path and sets it as the object's image.
     * 
     * @param {string} path - The path to the image file.
     * This method creates a new `Image` object, sets its source to the provided `path`,
     * and assigns it to the `img` property of the object.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the given array of paths and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image paths to load.
     * This method iterates over the array of image paths, creates new `Image` objects,
     * and stores them in the `imageCache` with the path as the key.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Plays an animation by cycling through the provided image paths.
     * 
     * @param {string[]} images - An array of image paths representing the animation frames.
     * This method sets the current image to the appropriate frame in the animation sequence 
     * by cycling through the `images` array using the `currentImage` index, and updates the 
     * object's `img` property accordingly.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}