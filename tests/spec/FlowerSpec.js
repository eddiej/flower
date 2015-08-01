// beforeEach(function() {
//   jasmine.getFixtures().fixturesPath = '../';
//   loadFixtures('index.html');
// });


// beforeEach(function() {
//   Flower.init();   
//   spy = spyOn(Flower, 'openFileDialog');
//   // spyEvent = spyOnEvent('#selectfile', 'click');
  
// });


// describe("Use Cases", function() {
  
//    it ("should add 6 list items to ul#use-cases.", function() {
    
//       $('#selectfile').trigger( "click" );
//       $('#selectfile').click();
//       $('#fileinput').trigger('change');
//       // expect($('section#use-cases ul li')).toBeInDOM()
//       // expect($('section#use-cases ul li').size()).toEqual(6)
//        // expect(Flower.openFileDialog).toHaveBeenCalled();
//        expect(spy).toHaveBeenCalled();
//     });

// });


$('#selectfile').on('click', this.openFileDialog);
    $('#fileinput').on('change', this.handleFileSelect);


    beforeEach(function() {
  jasmine.getFixtures().fixturesPath = 'spec/fixtures/';
  loadFixtures('flower.html');
});


beforeEach(function() {
  Flower.init();   
});


describe("Use Cases", function() {
  
  describe("Initial page load", function(){
    it ("should add 6 list items to ul#use-cases.", function() {
      expect($('section#use-cases ul li')).toBeInDOM()
      expect($('section#use-cases ul li').size()).toEqual(6)
    });
    it ("should include an image and header in each list item.", function() {
      expect($('section#use-cases ul li h3').size()).toEqual(6)
      expect($('section#use-cases ul li img').size()).toEqual(6)
    });
  });

  describe("After 'show more' text clicked", function() {
    var spyEvent;
    beforeEach(function() {
      spyEvent = spyOnEvent('#see-more', 'click');
      $('#see-more').trigger( "click" );
    });

    it ("adds two items to ul#use-cases", function(){
      expect('click').toHaveBeenTriggeredOn('#see-more');
      expect($('section#use-cases ul li h3').size()).toEqual(8)
    }); 
  });
});  

describe("Feedback Form", function() {
  describe("Initial page load", function(){
    it ("should have a disabled send button", function() {
      expect($('#send')).toHaveProp('disabled', true)
    });
  });
  describe("After <= 140 chars has been entered", function(){
    beforeEach(function() {
      $('textarea').val("some words").trigger('input');
    });
    it ("should enable the send button", function() {
      expect($('#send')).toHaveProp('disabled', false)
    });


    describe("After Send button pressed", function() {
      beforeEach(function() {
        spyOn($, "ajax");
        $('#send').trigger('click')
      });
      it ("should send feedback string through AJAX", function() {
        expect($.ajax.calls.mostRecent().args[0]["data"].get('feedback')).toEqual("some words");
      });
    });


  });

  describe("After > 140 chars has been entered", function(){
    beforeEach(function() {
      for(var i=0; i < 20; i++){
        $('textarea').val($('textarea').val()+"some words")
      }
      $('textarea').trigger('input');
    });
    it ("should disable the send button again", function() {
      expect($('#send')).toHaveProp('disabled', true)
    });
    it ("should display an error message", function() {
      expect($('.error')).toHaveText("Sorry! We can only accept up to 140 characters.")
    });
  });

  // describe("After File Selected", function() {
  //     beforeEach(function() {
  //       // spyEvent = spyOnEvent('form', 'submit');
  //       // $('#see-more').trigger( "click" );
  //       // $('form').trigger('submit');
  //     });
  //     it ("should display a success message", function() {
  //       // expect($('#sendStatus')).toHaveText();
  //       var testPerson = Flower();
  //       spyOn(testPerson, "handleFileSelect");
  //       $('#fileinput').trigger('change')
  //       // testPerson.toS/tring();
  //       expect(testPerson.handleFileSelect).toHaveBeenCalled();

  //       // spyEvent = spyOnEvent('form', 'submit');

  //     });
  //   });


});
