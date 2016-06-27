module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php\?rtype=load$/,
      respondwith: './more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=start$/,
      respondwith: './start.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=refresh$/,
      respondwith: './refresh.json'
    }
  ]
};
