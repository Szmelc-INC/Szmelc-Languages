{
  description = "Szmelc-Languages: Vibe-C, Szajs Script, Szmelc.inc, Markdebil, Machen and R3000";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAll = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in {
      packages = forAll (pkgs: {
        default = pkgs.stdenvNoCC.mkDerivation {
          pname = "szmelc-languages";
          version = "1.0.0";
          src = self;
          installPhase = ''
            install -Dm644 integrations/mime/szmelc-languages.xml $out/share/mime/packages/szmelc-languages.xml
            install -Dm644 integrations/magic/szmelc.magic $out/share/szmelc-languages/szmelc.magic
            install -Dm644 -t $out/share/vim/vimfiles/ftdetect integrations/vim/ftdetect/*.vim
            install -Dm644 -t $out/share/vim/vimfiles/syntax integrations/vim/syntax/*.vim
            install -Dm644 -t $out/share/szmelc-languages/grammars grammars/*.json
            install -Dm644 registry.json $out/share/szmelc-languages/registry.json
            install -Dm644 -t $out/share/doc/szmelc-languages README.md docs/*.md
            install -Dm644 LICENSE $out/share/licenses/szmelc-languages/LICENSE
          '';
          meta = {
            description = "Grammars, MIME types, file(1) magic and vim syntax for the Szmelc language family";
            homepage = "https://github.com/Szmelc-INC/Szmelc-Languages";
            license = pkgs.lib.licenses.mit;
            platforms = pkgs.lib.platforms.all;
          };
        };
      });

      apps = forAll (pkgs: {
        default = {
          type = "app";
          program = toString (pkgs.writeShellScript "szmelc-languages-check" ''
            cd ${self} && exec ${pkgs.nodejs}/bin/node tools/build.mjs --check
          '');
        };
      });

      devShells = forAll (pkgs: {
        default = pkgs.mkShell { packages = [ pkgs.nodejs pkgs.file pkgs.ruby ]; };
      });
    };
}
