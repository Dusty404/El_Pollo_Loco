class Statusbar extends DrawableObject {

    x = 20;
    percentage = 100;


    constructor() {
        super();
        this.percentage = 100;
        this.width = 200;
        this.height = 70;
    };


    /**
    * Resolves an index based on the percentage value.
    * The function returns an index that corresponds to the percentage range:
    * - 100% → 5
    * - 80% to 99% → 4
    * - 60% to 79% → 3
    * - 40% to 59% → 2
    * - 20% to 39% → 1
    * - 0% to 19% → 0
    * 
    * @returns {number} The index corresponding to the percentage range.
    */
    resolveIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    };


}