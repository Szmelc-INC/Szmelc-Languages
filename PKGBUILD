# Maintainer: Szmelc.INC <https://github.com/Szmelc-INC>
pkgname=szmelc-languages-git
_name=Szmelc-Languages
pkgver=1.0.0
pkgrel=1
pkgdesc="Vibe-C, Szajs Script, Szmelc.inc, Markdebil, Machen and R3000: grammars, MIME types, file(1) magic and vim syntax"
arch=('any')
url="https://github.com/Szmelc-INC/Szmelc-Languages"
license=('MIT')
depends=('shared-mime-info')
optdepends=('vim: syntax highlighting' 'neovim: syntax highlighting' 'file: magic-based detection')
makedepends=('git')
provides=('szmelc-languages')
conflicts=('szmelc-languages')
source=("git+${url}.git")
sha256sums=('SKIP')

pkgver() {
  cd "${_name}"
  printf "1.0.0.r%s.g%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
}

package() {
  cd "${_name}"
  install -Dm644 integrations/mime/szmelc-languages.xml "${pkgdir}/usr/share/mime/packages/szmelc-languages.xml"
  install -Dm644 integrations/magic/szmelc.magic "${pkgdir}/usr/share/szmelc-languages/szmelc.magic"
  install -Dm644 -t "${pkgdir}/usr/share/vim/vimfiles/ftdetect" integrations/vim/ftdetect/*.vim
  install -Dm644 -t "${pkgdir}/usr/share/vim/vimfiles/syntax" integrations/vim/syntax/*.vim
  install -Dm644 -t "${pkgdir}/usr/share/szmelc-languages/grammars" grammars/*.json
  install -Dm644 registry.json "${pkgdir}/usr/share/szmelc-languages/registry.json"
  install -Dm644 -t "${pkgdir}/usr/share/doc/${pkgname}" README.md docs/*.md
  install -Dm644 LICENSE "${pkgdir}/usr/share/licenses/${pkgname}/LICENSE"
}
