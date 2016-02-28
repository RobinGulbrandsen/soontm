import dateHandler from "./js/dateHandler";

(function () {
  const dateHandlerObj = dateHandler();
  const rootUrl = "/page?";

  const initFormValues = () => {
    dateHandlerObj.setDateInputAsNow();
  };
  initFormValues();

  const buildUrl = (text, date, stretched, color, protocol, image) => {
    return rootUrl + "text=" + text + 
                    "&date=" + date + 
                    "&stretched=" + stretched + 
                    "&color=" + color +
                    "&protocol=" + protocol +
                    "&image=" + image;;

  };

  const validateForm = (text, date, stretched, color, image) => {
    return true;
  };

  const newPageForm = document.querySelector("#newPageForm");
    newPageForm.addEventListener("submit", event => {
    event.preventDefault();
    
    const displayText = event.target.elements.text.value;
    const dateAsMiliseconds = dateHandlerObj.convertToDateAsMiliseconds(event.target.elements.day.value,
                                                           event.target.elements.hour.value,
                                                           event.target.elements.min.value,
                                                           event.target.elements.sec.value);
    const imageurl = event.target.elements.imageUrl.value;
    const urlArray = imageurl.split("://");
    const isStretched = event.target.elements.isStretched.checked;
    let backgroundColor = event.target.elements.backgroundColor.value;
    if(backgroundColor.indexOf("#") == 0) {
      backgroundColor = backgroundColor.substring(1, backgroundColor.length);
    }

    if(validateForm(displayText, dateAsMiliseconds, isStretched, backgroundColor, urlArray[0], urlArray[1])) {
      const url = buildUrl(displayText, dateAsMiliseconds, isStretched, backgroundColor, urlArray[0], urlArray[1]);
      window.location.href = url;  
    }
  });

})();
