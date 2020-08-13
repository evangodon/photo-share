FindUserByEmail
```fql
  Query(
    Lambda(
      "email",
      Select(
        "data",
        Map(
          Paginate(Match(Index("unique_email"), Var("email"))),
          Lambda("user", Get(Var("user")))
        )
      )
    )
  )
```