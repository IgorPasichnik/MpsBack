const { prisma } = require("../prisma/prisma-client.js");

const all = async (req, res) => {
  try {
    const { type } = req.query;

    let productions;

    if (type) {
      productions = await prisma.productions.findMany({
        where: {
          type: type,
        },
      });
    } else {
      productions = await prisma.productions.findMany();
    }

    res.status(200).json(productions);
  } catch {
    res
      .status(500)
      .json({ message: "Не удалось получить список по производству" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.type || !data.description) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const productions = await prisma.productions.create({
      data: {
        ...data,
      },
    });

    return res.status(201).json(productions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.productions.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить производство" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.productions.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch (err) {
    res.status(500).json({ message: "Не удалось редактировать производство" });
  }
};

const productions = async (req, res) => {
  const { id } = req.params;

  try {
    const productions = await prisma.productions.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(productions);
  } catch {
    res.status(500).json({ message: "Не удалось получить производство" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  productions,
};
