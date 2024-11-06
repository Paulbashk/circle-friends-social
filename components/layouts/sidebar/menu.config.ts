interface IMenuItem {
  title: string
  icon: string
  href: string
}

export const menuList: IMenuItem[] = [
  { title: 'Профиль', icon: 'mdi-home-city', href: '/' },
  { title: 'Заявки в друзья', icon: 'mdi-account', href: '/' },
  { title: 'Друзья', icon: 'mdi-account', href: '/' },
  { title: 'Лента', icon: 'mdi-account', href: '/' },
]
