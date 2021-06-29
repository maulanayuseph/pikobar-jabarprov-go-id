import { db } from '../lib/firebase'

function convertToJSON (documentSnapshot) {
  const data = documentSnapshot.data()
  return {
    ...data,
    published_at: data.published_at.toDate(),
    id: documentSnapshot.id
  }
}

export async function get () {
  const snapshots = await db
    .collection('vaccination_content')
    .orderBy('order', 'asc')
    .get()

  if (snapshots.empty) {
    return []
  }
  return snapshots
    .docs
    /**
     * Convert FirebaseFirestore.DocumentSnapshot to POJO
     */
    .map(convertToJSON)
}
