$(function () {
	tinymce.init({
		height: "500px",
		selector: ".mceEditor",
		fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar: "undo redo | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link imageupload | print preview media | forecolor backcolor",
        setup: function (editor) {
            editor.addButton('imageupload', {
                text: '',
                icon: 'image',
                tooltip: 'Insert/edit image',
                onclick: function () {
                    $('#fileUploadTinyMce').click();
                    setEditor(editor);
                }
            });

            editor.on('keyup', function (e) {
            	$('.mceEditor').val(editor.getContent());
            });

            editor.on("change", function () {
                debugger;
                $('.mceEditor').val(editor.getContent());
            });
        },
        image_advtab: true,
        templates: [
            { title: 'Home', url: '/Template/Home.html' },
            { title: 'Master Page', url: '/Template/MasterPage.html' }
        ],
        schema: "html5",
	    //encoding: "xml",
        entity_encoding : "raw",
        verify_html: false,
        extended_valid_elements: 'span[style|id|nam|class|lang]',
        forced_root_block: ''
    });
});