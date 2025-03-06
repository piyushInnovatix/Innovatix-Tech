document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault()

    let form = event.target
    let formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { "Accept": 'application/json' }
    })

        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                document.getElementById("formSucceed").classList.add("d-block")
                document.getElementById("formSucceed").classList.remove("d-none")
                setTimeout(() => {
                    document.getElementById("formSucceed").classList.remove("d-block")
                    document.getElementById("formSucceed").classList.add("d-none")
                }, 2000);
                form.reset()
            }
            else {
                document.getElementById("formError").classList.add("d-block")
                document.getElementById("formError").classList.remove("d-none")
                setTimeout(() => {
                    document.getElementById("formError").classList.remove("d-block")
                    document.getElementById("formError").classList.add("d-none")
                }, 1000);
                console.log(data)
            }
        })

        .catch(error => {
            console.error('Error:', error)
        })
})