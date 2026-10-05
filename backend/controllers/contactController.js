const {createContact,
  getContactsByUser,
  getContactById,
  updateContact,
  deleteContact,}= require ("../models/contactModel");

const create= async (req, res) => {
        try {
            const userId = req.user.userId;
            const contactData = req.body;
            const newContact = await createContact(userId, contactData);
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

const list= async (req, res) => {
        try {
            const userId = req.user.userId;
            const contacts = await getContactsByUser(userId);
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

const getOne = async (req, res) => {
  try {
    const userId = req.user.userId;      // from token
    const { id } = req.params;           // from URL (:id)
    const contact = await getContactById(userId, id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user.userId;      // from token
    const { id } = req.params;           // from URL (:id)
    const contactData = req.body;
    const updatedContact = await updateContact(userId, id, contactData);
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.userId;      // from token
    const { id } = req.params;           // from URL (:id)
    const deletedContact = await deleteContact(userId, id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    create,
    list,
    getOne,
    update,
    remove
};