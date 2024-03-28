

function Categories(props){
    let data = props.data;
    let includes = props.includes;
    let setCurrentCategory = props.setCurrentCategory;
    let currentCategory = props.currentCategory;
    let currentCategoryName = "";
    if(currentCategory!=""){
        let currentCategoryObj = includes.find(obj=> obj.id==currentCategory);
        currentCategoryName = currentCategoryObj.attributes.name;
    }
    let categoryArr = [];
    let catDisplay = [];
    catDisplay.push({
        id: "",
        name: "All"
    })
    includes.forEach(element => {
        catDisplay.push({
            id: element.id,
            name: element.attributes.name
        });
    });
    

    return (
        <div className="mb-4 mt-4">
           <h2>Categories</h2>
 
            {catDisplay.map((cat)=>{
                return (
                    <a href="#" className={`badge me-1 bg-primary ${cat.id==currentCategory? "active": ""}`} key={cat.id} onClick={()=>setCurrentCategory(cat.id)}>{cat.name}</a>
                )
            }
            )}
        </div>
    )
}

export default Categories;