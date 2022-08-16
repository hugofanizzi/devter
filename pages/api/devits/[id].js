import { firestore } from "firebaseservices/admin"

export default (request, response) => {
  const { query } = request
  const { id } = query

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      doc.data() ? response.json(doc.data()) : response.status(400).end()
    })
    .catch(() => {
      response.status(404).end()
    })
}
