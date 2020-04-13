import _kebabCase from 'lodash/kebabCase'
import _truncate from 'lodash/truncate'

function formatTitle (title) {
  const LIMIT = 100
  if (title.length > LIMIT) {
    return _truncate(_kebabCase(title), {
      length: LIMIT,
      omission: '',
      separator: '-'
    })
  }
  return _kebabCase(title)
}

export function slugifyInfographicRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/infographics/${formatTitle(title)}-inf.${id}`
}

export function slufigyDocumentRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/documents/${formatTitle(title)}-dcmnt.${id}`
}

export function slugifyArticleRoute (id, title) {
  if (!id || !title) {
    console.error('slugify: id and title must be supplied')
    return '#'
  }
  return `/articles/${formatTitle(title)}-artcl.${id}`
}
