### MODULE API

<br>

### plugin cypress-grep

1.  @flaky

### how to run all tests but the ones with tag `@flaky`
`yarn launch --grepTags=-@flaky`

### how to run all tests but the ones with tag `@flaky`
`yarn launch --grepTags=@flaky`

### how to run test with tag `@flaky` or `@bug`
`yarn launch --grepTags="@flaky @bug"`

### how to run test with tag `@flaky` and `@bug`
`yarn launch --grepTags=@flaky+@bug`