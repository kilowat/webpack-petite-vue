export default (icon)=>{
  return {
    $template: `
      <use xlink:href="/sprites/spritemap.svg#sprite-${icon}"></use>
      `
  }
}