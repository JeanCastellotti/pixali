import User from '#models/user'

export default class UserPresenter {
  toJSON(user: User) {
    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      emailVerifiedAt: user.emailVerifiedAt?.toFormat("dd/MM/yy à HH'h'mm"),
      createdAt: user.createdAt?.toFormat("dd/MM/yy à HH'h'mm"),
      updatedAt: user.updatedAt?.toFormat("dd/MM/yy à HH'h'mm"),
      profile: {
        website: user.profile.website,
        youtube: user.profile.youtube,
        twitch: user.profile.twitch,
      },
    }
  }
}
