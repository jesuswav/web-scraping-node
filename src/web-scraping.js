const { Builder, By } = require('selenium-webdriver')

// Esperar a que la pagina termine de cargar para garantizar que exista la clase
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrape() {
  // Inicializar el navegador Selenium (asegúrate de tener el WebDriver correspondiente)
  let driver = await new Builder().forBrowser('chrome').build()

  let data = []

  try {
    // Abre una página web
    await driver.get(
      'https://www.facebook.com/UTCalvillo/posts/pfbid0uoBcN7NMvxqakZM8rg2RPwLJd6KgV323jrGkgQgdK8bkw71rxr9pwHFnUUo3TFzFl'
    )

    await sleep(2000)

    // Encuentra la imagen por su clase
    let images = await driver.findElements(
      By.css(
        'img.xz74otr.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3'
      )
    )

    for (let image of images) {
      let url = await image.getAttribute('src')
      data.push(url)
    }

    // Imprime el valor de 'src'
    console.log('URLs: ', data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    // Cierra el navegador
    await driver.quit()
  }
}

scrape()
