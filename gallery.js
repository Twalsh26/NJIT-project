let mCurrentIndex = 0 // Tracks the current image index
let mImages = [];
const mUrl = 'MyImages.json'; // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds



$(document).ready(() => {
  $('.details').hide() // Hide details initially
 
  startTimer()// Call a function here to start the timer for the slideshow

  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  $('.moreIndicator').on('click', function()  {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle()
  }) // - slideToggle the visibility of the .details section

  $('#nextPhoto').on('click', showNextPhoto) // Select the "Next Photo" button and add a click event to call showNextPhoto

  $('#prevPhoto').on('click', showPrevPhoto)// Select the "Previous Photo" button and add a click event to call showPrevPhoto

  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.getJSON(mUrl, function (data) { mImages = data.villians 
     
    swapPhoto()

  })


}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  let currentPhoto = mImages[mCurrentIndex];
  $('#photo').attr('src', currentPhoto.imgPath); // Update the #photo element's src attribute with the current image's path
  $('.location').text("strength " + currentPhoto.strength);
  $('.description').text("Description " + currentPhoto.description);
  $('.date').text("Date: " + currentPhoto.date);// Update the .location, .description, and .date elements with the current image's details
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurrentIndex and call swapPhoto()
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length
 swapPhoto(); // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto()// Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
  setInterval(showNextPhoto, mWaitTime)
}
