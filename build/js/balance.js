var start = new AirDatepicker('.js-start', {
  //inline: true,
  //visible: true,
  //minDate: new Date(),
  maxDate: new Date(),
  onSelect({date}) {
    end.update({
      maxDate: date
    })
  }
});

var end = new AirDatepicker('.js-end', {
  //inline: true,
  //visible: true,
  minDate: new Date(),
  maxDate: new Date()
});
