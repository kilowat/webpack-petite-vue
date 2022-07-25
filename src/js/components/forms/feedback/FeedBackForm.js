
export default ()=>{
  return {
    submit(e) {
      const formData = new FormData(e.target)
      const model = Object.fromEntries(formData);
      console.log(model);
    }
  }
}