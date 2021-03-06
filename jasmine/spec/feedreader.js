/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it(`have URL's defined and not empty`, function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and not empty',function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* This test ensures that the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    describe('Initial Entries', function(){
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('has at least one entry in the feed container', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });

    });


    /* This test ensures that when a new feed is loaded
     * by the loadFeed function, the content actually changes.
     */
    describe('New Feed Selection', function() {
        let firstFeedEntry, secondFeedEntry;

        beforeEach(function(done){
            loadFeed(1, function() {
                secondFeedEntry = $('.feed').text();
                console.log(secondFeedEntry);
                done();
            });
        });

        it('content changes when a new feed is loaded', function(done) {
            loadFeed(0, function() {
                firstFeedEntry = $('.feed').text();
                console.log(firstFeedEntry);
                // Compares the two feeds
                expect(firstFeedEntry).not.toBe(secondFeedEntry);
                done();
            });
        });

    });

}());
