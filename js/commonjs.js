let cancelToken;
let loader = document.getElementById('loader');
let wrapper = document.getElementById('results')
async function handleSearchChange(event) {
  loader.style.display = 'block'; 
  let value =  event.target.value;
  const regexp = new RegExp(value, 'i');
  if(cancelToken){
    cancelToken.cancel('Operation cancelled due to new request')
  }
  cancelToken = axios.CancelToken.source()
     try{
      const response = await axios({
        method: 'get',
        url: 'https://color-names.herokuapp.com/v1/',
        responseType: 'stream',
        cancelToken: cancelToken.token
      }) 
      if(response.status === 200) {
        let listOfColor= '';
        const data = response.data.colors;
        const filterdList = data.filter(x => regexp.test(x.name));
        console.log('data ', data.length)
        if(filterdList.length !== 0){
          filterdList.forEach(element => {
            listOfColor += `<div class='list'><div class='colorDiv' style='background-color:${element.hex};'></div>${element.name}</div>`;
          });
        }else{
          listOfColor +=  `<div class='message'>Search Result not found</div>`
        }
        wrapper.innerHTML = listOfColor; 
        loader.style.display = 'none';
      }
    }catch(error){
      console.log(error)
    }
  }
