/** @format */

import PdfPrinter from "pdfmake"
import imageToBase64 from "image-to-base64"
import fs from "fs-extra"

// var externalDataRetrievedFromServer = [
//   { name: "Bartek", age: 34 },
//   { name: "John", age: 27 },
//   { name: "Elizabeth", age: 30 },
// ]

export const getPDFReadableStream = (user) => {
  console.log(user.experiences)
  const imageToPdf = async () => {
    const response = await imageToBase64(user.image) // Image URL
      .then((response) => {
        //console.log(response)
        return response
      })
      .catch((error) => {
        console.log(error)
        return response
      })
  }
  // const imageUrl = imageToPdf()
  // console.log(imageUrl)
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)
  // const tableContent = [
  //   // ["ROLE", "COMPANY", "AREA", "STARTDATE", "ENDDATE", "DESCRIPTION"],
  //   ["ROLE", "COMPANY", "AREA"],
  //   user.experiences.map((experience) => {
  //     return [
  //       experience.title,
  //       experience.company,
  //       experience.area,
  //       // experience.startDate,
  //       // experience.endDate,
  //       // experience.description,
  //     ]
  //   }),
  // ]
  // function buildTableBody(data, columns) {
  //   var body = []
  //   body.push(columns)
  //   data.forEach(function (row) {
  //     var dataRow = []
  //     columns.forEach(function (column) {
  //       dataRow.push(row[column].toString())
  //     })
  //     body.push(dataRow)
  //   })
  //   return body
  // }

  // function table(data, columns) {
  //   return {
  //     table: {
  //       headerRows: 1,
  //       body: buildTableBody(data, columns),
  //     },
  //   }
  // }

  const docDefinition = {
    content: [
      {
        text: `${user.name} ${user.surname}`,
        style: "header",
      },
      {
        text: `${user.email}`,
        style: "subheader",
      },
      {
        text: `${user.bio}`,
        style: "subheader",
      },
      {
        text: `${user.title}`,
        style: "subheader",
      },
      {
        text: `${user.area}`,
        style: "subheader",
      },
      {
        text: `${user.username}`,
        style: "subheader",
      },

      //   // {
      //   //   //image: fs.readFileSync(products.imageUrl, "base64"),
      //   //   //image: products.imageUrl,
      //   //   //image: `data:image/jpeg;base64,${imageToPdf}`,
      //   //   //image: `${products.imageUrl}`,
      //   // },
      //   {
      //     style: "tableExample",
      //     table: {
      //       body: tableContent,
      //     },
      //   },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
    },
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()

  return pdfReadableStream
}
