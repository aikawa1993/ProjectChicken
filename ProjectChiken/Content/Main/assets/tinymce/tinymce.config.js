﻿// max number of chars allwed in a tinyMice component
var tinyMiceMaxCharLength = 20000;

function loadTinyMiceRichTextFeature(controlName, inputCopyIdentifier) {
    var configArray = {
        // General options
        width: "700px",
        height: "500px",
        theme: "advanced",
        editor_selector: "textarea",
        mode: "none",
        plugins: "autolink,lists,pagebreak,style,table,advhr,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave,visualblocks",

        // Theme options
        theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect",
        theme_advanced_buttons2: "fontselect,fontsizeselect,!,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent",
        theme_advanced_buttons3: "blockquote,|,undo,redo,|,link,unlink,anchor,|,insertdate,inserttime,preview,!,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print",
        theme_advanced_buttons4: "tablecontrols",
        theme_advanced_buttons5: "moveforward,movebackward,absolute,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft,visualblocks,|,forecolor,backcolor,fullscreen,|,ltr,rtl,|,code",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: true,
        theme_advanced_path: false,

        // Drop lists for link/image/media/template bloglists
        template_external_list_url: "lists/template_list.js",
        external_link_list_url: "lists/link_list.js",
        external_image_list_url: "lists/image_list.js",
        media_external_list_url: "lists/media_list.js",

        // Style formats
        style_formats: [
			{ title: 'Bold Text', inline: 'b' },
			{ title: 'Red Text', inline: 'span', styles: { color: '#ff0000' } },
			{ title: 'Red Title', block: 'h1', styles: { color: '#ff0000' } }
        ],
        charLimit: tinyMiceMaxCharLength, // this is a default value which can get modified later
        //set up a new editor function 
        setup: function (ed) {
            //peform this action every time a key is pressed
            ed.onKeyUp.add(function (ed, e) {
                updateTinyMiceHtmlCounter(ed, e, inputCopyIdentifier);
            });
            // event called when the content is to be loaded in the rich text editor
            ed.onLoadContent.add(function (ed, o) {
                if (tinyMCE.editors != null && tinyMCE.editors.length > 0) {
                    var trueValue = "#formInput " + " ." + controlName;
                    if ($(trueValue) != null && $(trueValue).val() != null) {
                        // update content
                        tinyMCE.activeEditor.setContent($(trueValue).val());
                        // trigger click so validation will be performed even
                        // if no data is modified in the editor
                        updateTinyMiceHtmlCounter(ed, o, inputCopyIdentifier);
                    }
                }
            });
        }
    };

    tinyMCE.settings = configArray;
    tinyMCE.execCommand('mceAddControl', true, controlName);
}

// update tiny mice html counter
function updateTinyMiceHtmlCounter(ed, e, inputCopyIdentifier) {
    //define local variables
    var tinymax, tinylen, htmlcount;
    //manually setting our max character limit
    tinymax = ed.settings.charLimit;
    //grabbing the length of the curent editors content
    tinylen = ed.getContent().length;
    //setting up the text string that will display in the path area
    htmlcount = "# of HTML characters: " + tinylen + "/" + tinymax;
    //if the user has exceeded the max turn the path bar red.
    if (tinylen > tinymax) {
        htmlcount = "<span style='font-weight:bold; color: #f00;'>" + htmlcount + "</span>";
    }
    // copy content to follow up text area so it can be validated
    $(inputCopyIdentifier).val(ed.getContent());

    //this line writes the html count into the path row of the active editor
    tinymce.DOM.setHTML(tinymce.DOM.get(tinyMCE.activeEditor.id + '_path_row'), htmlcount);
}

var inputCopy = "input.tinyMCECopy";

$().ready(function () {
    // load rich text feature
    loadTinyMiceRichTextFeature("tinyMCEContent", inputCopy);

    // allow the validation of hidden fields so the tinymce textarea
    // can be validated
    $.validator.setDefaults({ ignore: "" });

    // validate form
    $("#formInput").validate({
        rules: {
            inputCopy: {
                required: true,
                maxlength: tinyMiceMaxCharLength
            },
        }
    });
});