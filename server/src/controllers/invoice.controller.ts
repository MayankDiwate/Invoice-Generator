import { NextFunction, Request, Response } from "express";
import fs from "fs";
import handlebars from "handlebars";
import puppeteer from "puppeteer";
import { uuid } from "uuidv4";
import { InvoiceData } from "../models/invoiceData.model";
import Product from "../models/product.model";
import { errorHandler } from "../utils/error";

handlebars.registerHelper("multiply", (a, b) => {
  return a * b;
});

export const addProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return next(errorHandler(500, "Id is required"));
  }

  try {
    const product = new Product({
      invoiceId: id,
      name: req.body.name,
      quantity: req.body.quantity,
      rate: req.body.rate,
      total: req.body.quantity * req.body.rate,
    });

    await product.save();

    res.json({ message: "Product added successfully", product });
  } catch (error: any) {
    next(error.message);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return next(errorHandler(500, "Id is required"));
  }

  try {
    const products = await Product.find({ invoiceId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error: any) {
    next(error.message);
  }
};

export const generatePDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { invoiceName, total } = req.body;
  const { id } = req.params;

  if (!id) {
    return next(errorHandler(500, "Id is required"));
  }
  const products = await Product.find({ invoiceId: id });

  // compile hbs template and generate pdf
  const compileTemplate = async (
    templatePath: string,
    data: InvoiceData
  ): Promise<string> => {
    const html = await fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(html);
    return template(data);
  };

  const validDays = 7;

  const invoiceData: InvoiceData = {
    products,
    total,
    gst: 18,
    grandTotal: total * 1.18,
    validUntil: (new Date().getUTCDate() + validDays > 31
      ? new Date().getUTCDate() + validDays - 31
      : new Date().getUTCDate() + validDays
    ).toString(),
  };

  console.log("INVOICE_DATA", invoiceData);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compileTemplate("src/invoice.hbs", invoiceData);

    await page.setContent(content);
    await page.pdf({
      path: `${invoiceName}.pdf`,
      format: "A4",
      printBackground: true,
    });

    console.log("CONTENT", content);

    await browser.close();
    res.status(200).json({ message: "PDF generated successfully!" });
    process.exit();
  } catch (error: any) {
    next(error.message);
  }
};
