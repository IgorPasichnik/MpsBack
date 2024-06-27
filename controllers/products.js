const { prisma } = require("../prisma/prisma-client.js");

const all = async (req, res) => {
  try {
    const { type } = req.query;

    let products;

    if (type) {
      products = await prisma.products.findMany({
        where: {
          type: type,
        },
      });
    } else {
      products = await prisma.products.findMany();
    }

    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Не удалось получить список продуции" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.type || !data.description) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const products = await prisma.products.create({
      data: {
        ...data,
        // userId: req.user.id,
      },
    });

    return res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.products.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить продукцию" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.products.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch (err) {
    res.status(500).json({ message: "Не удалось редактировать продукцию" });
  }
};

const products = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await prisma.products.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Не удалось получить продукцию" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  products,
};
