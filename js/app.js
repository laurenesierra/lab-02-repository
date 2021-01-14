'use strict';

// step 1 make constructor funtion that can make a new instance of object X
// step 2 make a render prototype ( clone  .find  etc) append it to where it belongs on page
// ajax is final step and is where steps 1 and two are combind loop thru json file one loop to use and store function 2 loops one that loops thru json each json object will be new instance second will  our render prototype render
const unicorn = [];

function PopulateImage(title, url, description, horns, keyword) {
  this.title = title;
  this.image_url = url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
}
PopulateImage.prototype.render = function () {
  const $imgClone = $('#photo-template').clone();
  const $img = $imgClone.find('img');
  $imgClone.find('h2').text(this.title);
  $imgClone.attr('id', this.keyword);
  $img.attr('src', this.image_url);
  $img.attr('alt', this.description);
  $imgClone.find('p').text(this.description);
  $('main').append($imgClone);
};
// PopulateImage.prototype.dropMenu = function () {
//   const $dropMenuClone = $(`<option value=${this.keyword}>${this.keyword}</option>`);
//   $('select').append($dropMenuClone);
//   // $dropMenuClone.attr('value', this.keyword);
//   // $dropMenuClone.text(this.keyword);
//   // while value is being displayed only show one of each keyword
// };
$.ajax('data/page-1.json').then(pickImage => {
  console.log(pickImage);
  const animalArray = [];
  pickImage.forEach(element => {
    unicorn.push(new PopulateImage(element.title, element.image_url, element.description, element.horns, element.keyword));
  });
  unicorn.forEach(animal => {
    animal.render();
    // animal.dropMenu();
  });
  unicorn.forEach(animal => {
    if (!animalArray.includes(animal.keyword)) {
      animalArray.push(animal.keyword);
      const $dropMenuClone = $(`<option value=${animal.keyword}>${animal.keyword}</option>`);
      $('select').append($dropMenuClone);
    }
  });
  $(document).ready(function () {
    $('#options').on('change', function () {
      let str = "";
      $('option').hide();
      str += $( this ).text() + " ";
    });

  });
});
