import _kebabCase from 'lodash/kebabCase'

export function slugifyInfographicRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/infographics/${_kebabCase(title)}-inf.${id}`
}

export function slufigyDocumentRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/documents/${_kebabCase(title)}-inf.${id}`
}

export function slugifyArticleRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/articles/${_kebabCase(title)}-artcl.${id}`
}
