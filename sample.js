fetch(file)
    .then((x) => { x.text() })
    .then((y) => { myDisplay(y) });

    fetch(file, function(x) {
        x.text(function(y) {
            myDisplay(y)
        })
});
