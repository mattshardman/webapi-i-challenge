const db = require("./data/db");

const insert = async req => {
  try {
    const result = await db.insert(req.body);
    return { status: 201, json: result };
  } catch (e) {
    const errorMessage = {
      error: "There was an error while saving the user to the database."
    };
    return { status: 501, json: errorMessage };
  }
};

const find = async req => {
  try {
    const result = await db.find();
    return { status: 200, json: result };
  } catch (e) {
    const errorMessage = {
      error: "The users information could not be retrieved."
    };
    return { status: 500, json: errorMessage };
  }
};

const findById = async req => {
  try {
    const result = await db.findById(req.params.id);
    if (!result) {
      const errorMessage = {
        error: "The user with the specified ID does not exist."
      };
      return { status: 404, json: errorMessage };
    }
    return { status: 200, json: result };
  } catch (e) {
    const errorMessage = {
      error: "The users information could not be retrieved."
    };
    return { status: 500, json: errorMessage };
  }
};

const deleteOne = async req => {
  try {
    const result = await findById(req);
    if (result.status === 404 || result.status === 500) {
      return result;
    }
    await db.remove(req.params.id);
    return result;
  } catch (e) {
    const errorMessage = {
      error: "The users information could not be retrieved."
    };
    return { status: 500, json: errorMessage };
  }
};

const update = async req => {
  try {
    const result = await db.update(req.params.id, req.body);
    if (!result) {
      const errorMessage = {
        error: "The user with the specified ID does not exist."
      };
      return { status: 404, json: errorMessage };
    }
    const updatedUser = await findById(req);
    return updatedUser;
  } catch (e) {
    const errorMessage = {
      error: "The user information could not be modified."
    };
    return { status: 500, json: errorMessage };
  }
};

module.exports = {
  insert,
  find,
  findById,
  deleteOne,
  update
};
