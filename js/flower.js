var Flower = {
  fileData: new FormData(),
  settings: {
    useCases: [
      {name: 'Sentiment Analysis', image: 'use_case_senti_analysis_2x.png', alt: 'Sentiment Analysis Diagram'},
      {name: 'Search Relevance Tuning', image: 'use_case_search_rel_2x.png', alt: 'Search Relevance Tuning Diagram'},
      {name: 'Data Categorization', image: 'use_case_data_cat_2x.png', alt: 'Data Categorization Diagram'},
      {name: 'Business Data Enrichment', image: 'use_case_biz_data_enrich_2x.png', alt: 'Business Data Enrichment Diagram'},
      {name: 'Metadata Creation', image: 'use_case_metadata_creation_2x.png', alt: 'Metadata Creation Diagram'},
      {name: 'Image Annotation', image: 'use_case_image_annotation_2x.png', alt: 'Image Annotation Diagram'},
      {name: 'Transcription', image: 'use_case_transcription_2x.png', alt: 'Transcription Diagram'},
      {name: 'Deduplication', image: 'use_case_de_duplication_2x.png', alt: 'Deduplication Diagram'}
    ]
  },

  init: function(){
    
    /* create the list markup for the first 6 items and append */
    var listItems = this.createListMarkup(0, 5, 'show');
    $('#use-cases ul').append(listItems);

    /* add markup for next two list items when link is clicked */
    $("#see-more").on('click', function(e){
        e.preventDefault(); /* dont follow any href */
        self = $(this);
        if(!self.hasClass('disabled')){ 
          $('#use-cases ul').append(Flower.createListMarkup(6, 7, 'animate'));
          self.addClass('disabled')
        }
    });

    /* limit the character input to 140 characters */
    $('#feedback textarea').on('input', this.checkTextLength) /* input covers pasting */ 

    /* set up handlers for the drop target and file select button */
    $('#selectfile').on('click', this.openFileDialog);
    $('#fileinput').on('change', this.handleFileSelect);
    $('#dropzone')
      .on('dragover', this.handleDragOver)
      .on('dragleave', this.handleDragLeave)
      .on('dragend', this.handleDragEnd)
      .on('drop', this.handleDrop);

    $('form').on('submit', this.postFiles);
  },


  createListMarkup: function(fromIndex, toIndex, listClass) {
    var useCases = this.settings.useCases
    var listItems = '';
    for(var i=fromIndex; i <= toIndex; i++){
      listItems += 
        "<li class='"+(typeof(listClass)==='undefined' ? '' : listClass)+"'>" + 
          "<a href='#'>" +
            "<img src='images/"+useCases[i]['image']+"' alt='"+useCases[i]['alt']+"' />" + 
            "<h3>"+useCases[i]['name']+"</h3>" +
          "</a>" + 
        "</li>"; 
    }
    return listItems;
  },

  checkTextLength : function() {    
    textarea = $(this);
    content = textarea.val();
    sendButton = $('#send');
    errorElement = $('#feedback p.error');

    if(content.length > 140){
      sendButton.prop('disabled', true);
      errorElement.html('Sorry! We can only accept up to 140 characters.');
      textarea.addClass('error');
    } else{
      sendButton.prop('disabled', false);
      errorElement.empty();
      textarea.removeClass('error');
    }
  },

  openFileDialog: function(e){
    e.preventDefault();
    $('input[type=file]').click(); /* triggers the file select modal */
  },

  handleFileSelect: function(e) {
    var files;
    var fileNames = '';
    var data = new FormData();

    if(e.type == 'drop'){
      files = e.originalEvent.dataTransfer.files; /* access files via dataTransfer object */    
    } else {
      files = e.target.files; /* access files via file input */
    }

    /* Show the selected file names on the page */ 
    $.each(files, function(key, value)
    {
      fileNames += ("<li>" + value.name + "</li>");
      data.append(key, value);
    });
    Flower.fileData = data;
  
    $('#fileinformation').html(fileNames);
  },

  handleDragOver: function(e) {
    e.preventDefault(); /* Prevent files from opening in the browser */
    $(e.target).addClass('over');
  },

  handleDragLeave: function(e) {
    $(e.target).removeClass('over');
  },

  handleDrop: function(e) {
    e.preventDefault(); /* Prevent files from opening in the browser */
    e.stopPropagation(); 
    $(e.target).removeClass('over');
    Flower.handleFileSelect(e);
  },

  handleDragEnd: function(e) {
    $(e.target).removeClass('over');
  },

  postFiles: function(e){
    e.preventDefault();
      
    var sendStatus = $('#sendStatus');
    var data = Flower.fileData;

    /* append the feedback textarea contents to the file data. */
    data.append('feedback', $('textarea').val());
    
    $.ajax({
      url : "#",
      type: "POST",
      data : data,
      cache: false,
      processData: false,
      contentType: false,

      success: function(data, textStatus, jqXHR){
        sendStatus
          .removeClass('error')
          .html('Thank you, your feedback has been received.')
      },
      error: function(jqXHR, textStatus, errorThrown){
        sendStatus
          .addClass('error')
          .html('Error '+jqXHR.status+ ' - '+errorThrown)
      }
    });
  }
};

$(function() {      
  Flower.init();    
});
