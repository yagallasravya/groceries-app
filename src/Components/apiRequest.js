 const apiRequest=async(url="",obj=null,errmsg=null)=>{
    try{
      const response=await fetch(url,obj);
      if(!response.ok) throw Error("please reload the app")
    }catch(err){
         errmsg=err.message;
    }finally{
         return errmsg;
    }
}

export default apiRequest;