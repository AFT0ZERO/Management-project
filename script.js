document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const cardTitleInput = document.getElementById('cardTitle');
    const cardDescriptionInput = document.getElementById('cardDescription');

    // Fetch existing cards from the JSON server
    fetch('http://localhost:3000/cards')
        .then(response => response.json())
        .then(cards => {
            cards.forEach(card => {
                createCardElement(card.id, card.title, card.description, card.date, card.status);
            });
        });

    document.body.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'addCardButton') {
            const cardTitle = cardTitleInput.value.trim();
            const cardDescription = cardDescriptionInput.value.trim();
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const cardDate = `${year}-${month}-${day}`;
            const cardStatus = 'To Do'; // Default status

            if (cardTitle !== "") {
                const newCard = {
                    title: cardTitle,
                    description: cardDescription,
                    date: cardDate,
                    status: cardStatus
                };

                // Add new card to JSON server
                fetch('http://localhost:3000/cards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCard)
                })
                    .then(response => response.json())
                    .then(card => {
                        createCardElement(card.id, card.title, card.description, card.date, card.status);
                    });

                // Clear the input fields
                cardTitleInput.value = '';
                cardDescriptionInput.value = '';
            } else {
                alert('Please enter a card title.');
            }
        }
    });

    function createCardElement(id, title, description, date, status) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');

        const cardHeader = document.createElement('h3');
        cardHeader.textContent = title;

        const cardBody = document.createElement('p');
        cardBody.textContent = description;

        const cardDateElement = document.createElement('h3');
        cardDateElement.textContent = date;

        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        `;
        statusSelect.value = status;
        statusSelect.addEventListener('change', function () {
            updateCardStatus(id, statusSelect.value);
        });

        const editButton = document.createElement('button');
        editButton.textContent = "Edit Card";
        editButton.classList.add('btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Card";
        deleteButton.classList.add('btn');
        deleteButton.addEventListener('click', function () {
            deleteCard(id, newCard);
        });

        newCard.appendChild(cardHeader);
        newCard.appendChild(cardBody);
        newCard.appendChild(cardDateElement);
        newCard.appendChild(statusSelect);
        newCard.appendChild(editButton);
        newCard.appendChild(deleteButton);

        content.appendChild(newCard);
    }

    function updateCardStatus(id, status) {
        fetch(`http://localhost:3000/cards/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Status updated:', data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    }

    function deleteCard(id, cardElement) {
        fetch(`http://localhost:3000/cards/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    content.removeChild(cardElement);
                    console.log('Card deleted');
                } else {
                    console.error('Error deleting card');
                }
            })
            .catch(error => {
                console.error('Error deleting card:', error);
            });
    }
});
