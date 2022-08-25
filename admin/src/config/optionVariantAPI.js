import axiosClient from './axiosClient'

export const createOptionVariant = async (name, OptionId) => {
  const data = await axiosClient.post(`/admin/option-value`, { name, optionId: OptionId })

  return data
}

export const deleteOptionVariant = async (Optionid, VariantId) => {
  const data = await axiosClient.delete(`/admin/option-value/${VariantId}`)

  return data
}

export const updateOptionVariant = async (name, OptionId, VariantId) => {
  const data = await axiosClient.put(`/admin/option-value/${VariantId}`, {
    name: name,
    optionId: OptionId,
  })

  return data
}
