import axios from "axios"

export const getList = async (path) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`
    )
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
export const getItem = async (path, id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${path}/${id}?populate=orders&sort=createdAt:desc`
    )
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
export const postItem = async (path, data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`,
      {
        data: data
      }
    )
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
export const DeleItem = async (path, id) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${path}/${id}`
    )
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
export const putItem = async (path, id, data) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${path}/${id}`,
      {
        data: data
      }
    )
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
