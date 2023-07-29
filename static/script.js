var date = new Date()
let display_date = "Date:" + date.toLocaleDateString()

let predicted_emotion;

$(document).ready(function () {
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
    displayBot()
})

$(function () {
    $("#predict_button").click(function () {

        let input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {

                predicted_emotion = result.data.predicted_emotion
                emotion_img_url=result.data.predicted_emotion_img_url
                
                //Send the predicted emotion and image url to HTML
                $("#prediction").html(predicted_emotion)
                $("#emo_img_url").attr('src', emotion_img_url);

                //Set the display 
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");

               //Enable the Save Button
                $('#save_button').prop('disabled', false);
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
})
