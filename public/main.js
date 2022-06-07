console.log('hi');

const update = document.querySelector('#update-button');

const upsertData = {
    name: 'Darth Vader',
    quote: "You don't want to choke on your aspirations.",
}

update.addEventListener('click', _event => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(upsertData),
    })
});
