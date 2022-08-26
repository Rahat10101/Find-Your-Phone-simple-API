document.getElementById('button-search').addEventListener('click', () => {
    toggleLoading('block');
    toggleNoResultFound('none')
    toggleEmptySearch('none')
    const searchText = document.getElementById('search-bar').value;

    if (searchText === '') {
        toggleEmptySearch('block')
        toggleLoading('none');
        return false;
    };

    searchPhones(searchText.toLowerCase()); // Upper Lower doesn't matter
});


//Search Phones
const searchPhones = search => {
    const phoneSearchUrl = `https://openapi.programming-hero.com/api/phones?search=${search}`; //API call
    fetch(phoneSearchUrl)
        .then(response => response.json())
        .then(result => showSearchResult(result));

}

//handling loading
function toggleLoading(style) {
    document.getElementById('loading').style.display = style;
}
//handling serach result not found
function toggleNoResultFound(style) {
    document.getElementById('notFound').style.display = style;
}

//handling empty serach
function toggleEmptySearch(style) {
    document.getElementById('emptySearch').style.display = style;
}



// Getting Phone Details
const getDetails = slug => {
    const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${slug}`; //phone search api
    fetch(phoneDetailsUrl)
        .then(response => response.json())
        .then(result => showPhoneDetails(result));
}


//display phone details
function showPhoneDetails(result) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    if (result.status === false) {
        console.log('Nothing found')
        return false;
    }

    const results = document.getElementById('details');
    results.textContent = "";

    const div = document.createElement('div');
    div.classList.add('row');
    div.classList.add('m-2');
    div.innerHTML = createPhoneDetails(result.data)
    results.appendChild(div)
}



//show result to user
const showSearchResult = result => {

    const results = document.getElementById('results');
    document.getElementById('details').textContent = "";
    if (result.status === false) {
        toggleNoResultFound('block')
        toggleLoading('none');
    }

    results.textContent = "";
    i = 0;
    for (phone in result.data) {
        if (i < 20) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = createCard(result.data[phone])
            results.appendChild(div)
        }
        i++;
    }
    toggleLoading('none');
}


//create phone card
const createCard = phone => {
    return `<div class="card m-3 shadow">
        <img style="height:200px; 
        object-fit:contain" src="${phone.image}" 
        class="img-thumbnail" alt="${phone.phone_name}">
        <div class="card-body"> <h5 class="card-title">${phone.phone_name}
        </h5><h6 class="card-subtitle mb-2 text-muted ">${phone.brand}
        </h6><button   onClick="getDetails('${phone.slug}')" 
        class="btn btn-sm btn-outline-dark">Details</button></div></div>`
}


//create phone details
const createPhoneDetails = phone => {

    let release = '';
    if (phone.releaseDate == '') {
        released = 'Release date Unavailable';
    }
    else {
        released = phone.releaseDate;
    }

    if (phone.hasOwnProperty('others')) {
        return ` 
        <img src="${phone.image}" 
        class="mb-4 "  alt="${phone.name}" 
        height="300px" style="object-fit: contain;">
    <h1>
    ${phone.name}
    </h1>
    <h6 class="text-info">
        ${released}
    </h6>
    <h5 class="text-muted">
    ${phone.brand}
    </h5>
    <div class="row row-cols-1 row-cols-md-1 row-cols-lg-2">
        <div class="col table-responsive">
            <table class="table table-striped my-5">
                <tr>
                    <th colspan="2">
                        <h2 class="text-dark">Main features :</h2>
                    </th>
                </tr>
                <tr>
                    <th>Storage</th>
                    <td>${phone.mainFeatures.storage}</td>
                </tr>
                
                <tr>
                    <th>Display Size</th>
                    <td>
                        ${phone.mainFeatures.displaySize}
                    </td>
                </tr>
                <tr>
                    <th>
                        Chip-Set
                    </th>
                    <td>
                        ${phone.mainFeatures.chipSet}
                    </td>
                </tr>
                <tr>
                    <th>
                        Memory
                    </th>
                    <td>
                        ${phone.mainFeatures.memory}                    
                    </td>
                </tr>
                <tr>
                    <th>
                        Sensors
                    </th>
                    <td>
                        ${Object.values(phone.mainFeatures.sensors).join(', ')}
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
  `;
    }

    else {
        return `  <img src="${phone.image}" class="mb-4"  alt="${phone.name}" height="300px" style="object-fit: contain;">
        <h1>
        ${phone.name}
        </h1>
        <h6 class="text-info">
            ${released}
        </h6>
        <h5 class="text-muted">
        ${phone.brand}
        </h5>
        <div class="row row-cols-1 row-cols-md-1 row-cols-lg-1 mx-auto">
            <div class="col table-responsive">
                <table class="table table-striped my-5">
                    <tr>
                        <th colspan="2">
                            <h2 class="text-dark">Main features :</h2>
                        </th>
                    </tr>
                    <tr>
                        <th>Storage</th>
                        <td>${phone.mainFeatures.storage}</td>
                    </tr>
                    
                    <tr>
                        <th>Display Size</th>
                        <td>
                            ${phone.mainFeatures.displaySize}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Chip Set
                        </th>
                        <td>
                            ${phone.mainFeatures.chipSet}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Memory
                        </th>
                        <td>
                            ${phone.mainFeatures.memory}                    
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Sensors
                        </th>
                        <td>
                            ${Object.values(phone.mainFeatures.sensors).join(', ')}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
      `;
    }
}