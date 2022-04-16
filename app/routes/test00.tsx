export default function Test() {
  return (
    <>
      <h1>CSSテスト</h1>

      <section>
        <h1>色比較</h1>
        <h3>文字</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 180px 180px 150px 150px 180px",
            gridTemplateRows: `repeat(auto-fill)`,
            textAlign: "center",
          }}
        >
          <p style={{ color: `var(--primary-transparent)` }}>
            primary-transparent
          </p>
          <p style={{ color: `var(--primary-lighter)` }}>primary-lighter</p>
          <p style={{ color: `var(--primary-light)` }}>primary-light</p>
          <p style={{ color: `var(--primary)` }}>primary</p>
          <p style={{ color: `var(--primary-dark)` }}>primary-dark</p>
          <p style={{ color: `var(--primary-darker)` }}>primary-darker</p>
          <p style={{ color: `var(--secondary-transparent)` }}>
            secondary-transparent
          </p>
          <p style={{ color: `var(--secondary-lighter)` }}>secondary-lighter</p>
          <p style={{ color: `var(--secondary-light)` }}>secondary-light</p>
          <p style={{ color: `var(--secondary)` }}>secondary</p>
          <p style={{ color: `var(--secondary-dark)` }}>secondary-dark</p>
          <p style={{ color: `var(--secondary-darker)` }}>secondary-darker</p>
        </div>
        <h3>背景</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 180px 180px 150px 150px 180px",
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          <p style={{ backgroundColor: `var(--primary-transparent)` }}>
            primary-transparent
          </p>
          <p style={{ backgroundColor: `var(--primary-lighter)` }}>
            primary-lighter
          </p>
          <p style={{ backgroundColor: `var(--primary-light)` }}>
            primary-light
          </p>
          <p style={{ backgroundColor: `var(--primary)` }}>primary</p>
          <p style={{ backgroundColor: `var(--primary-dark)` }}>primary-dark</p>
          <p style={{ backgroundColor: `var(--primary-darker)` }}>
            primary-darker
          </p>

          <p style={{ backgroundColor: `var(--secondary-transparent)` }}>
            secondary-transparent
          </p>
          <p style={{ backgroundColor: `var(--secondary-lighter)` }}>
            secondary-lighter
          </p>
          <p style={{ backgroundColor: `var(--secondary-light)` }}>
            secondary-light
          </p>
          <p style={{ backgroundColor: `var(--secondary)` }}>secondary</p>
          <p style={{ backgroundColor: `var(--secondary-dark)` }}>
            secondary-dark
          </p>
          <p style={{ backgroundColor: `var(--secondary-darker)` }}>
            secondary-darker
          </p>
        </div>
      </section>

      <h1>見出し 1</h1>
      <h2>見出し 2</h2>
      <h3>見出し 3</h3>
      <h4>見出し 4</h4>
      <h5>見出し 5</h5>
      <h6>見出し 6</h6>

      <section>
        <h1 id="paragraph">パラグラフ</h1>

        <p>
          要件も事典フェアに著作し実況ないあっため、
          <a href="#" title="テストリンク">
            テストリンク(a)
          </a>
          引用されプロジェクトを.者必要の著作文がなっれがは考えるませ、ライセンスの一つも、引用満たさ例を引用しれこととして合意明瞭んでているますます。しかし、メディアの引用権は、内容の特定しれ転載適法たルールに引用し、その内容を基づいて理事と引用しことを著作なるれるます。
        </p>

        <p>
          またはを、投稿ペディアに著作あるればいる慣行を時にしありものは、書評なで、場合としても検証会の受信について法典上の問題はさことに、被投稿権は、活発の承諾と有しば例外が著作反するますているますです。
        </p>

        <hr />

        <h1 id="list_types">リスト要素</h1>
      </section>
      <h3>定義型リスト(dl)</h3>
      <dl>
        <dt>定義型リスト用語</dt>
        <dd>定義型リスト定義</dd>
      </dl>

      <h3>順序付きリスト(ol)</h3>
      <ol>
        <li>リストアイテム 1</li>
        <li>リストアイテム 2</li>
        <li>リストアイテム 3</li>
      </ol>

      <h3>並列列挙リスト(ul)</h3>
      <ul>
        <li>リストアイテム 1</li>
        <li>リストアイテム 2</li>
        <li>リストアイテム 3</li>
      </ul>
      <hr />

      <section>
        <h1 id="tables">テーブル</h1>
        <table>
          <caption>Demo Table</caption>
          <thead>
            <tr>
              <th>カラム1</th>
              <th>カラム2</th>
              <th>カラム3</th>
              <th>カラム4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>１の１</td>
              <td>１の２</td>
              <td>１の３</td>
              <td>１の４</td>
            </tr>
            <tr>
              <td>２の１</td>
              <td>２の２</td>
              <td>２の３</td>
              <td>２の４</td>
            </tr>
            <tr>
              <td>３の１</td>
              <td>３の２</td>
              <td>３の３</td>
              <td>３の４</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>合計１</th>
              <th>合計２</th>
              <th>合計３</th>
              <th>合計４</th>
            </tr>
          </tfoot>
        </table>
      </section>

      <h1 id="misc">その他</h1>


      <blockquote>
      つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
        <br />
        -引用(blockquote)
      </blockquote>

      <section>
        <h2>Form &amp; Controls</h2>
        <section>
          <h3>Inputs &amp; Textareas</h3>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "400px 400px 400px",
            }}
          >
            <p>
              <label htmlFor="input">
                Input without type (defaults to text)
              </label>
              <br />
              <input id="input" placeholder="Input" />
            </p>
            <p>
              <label htmlFor="input-text">Input with type={"text"}</label>
              <br />
              <input type="text" id="input-text" />
            </p>
            <p>
              <label htmlFor="input-date">Input with type={"date"}</label>
              <br />
              <input type="date" id="input-date" />
            </p>
            <p>
              <label htmlFor="input-datetime-local">
                Input with type={"datetime-local"}
              </label>
              <br />
              <input type="datetime-local" id="input-datetime-local" />
            </p>
            <p>
              <label htmlFor="input-email">Input with type={"email"}</label>
              <br />
              <input type="email" id="input-email" />
            </p>
            <p>
              <label htmlFor="input-month">Input with type={"month"}</label>
              <br />
              <input type="month" id="input-month" />
            </p>
            <p>
              <label htmlFor="input-number">Input with type={"number"}</label>
              <br />
              <input type="number" id="input-number" />
            </p>
            <p>
              <label htmlFor="input-password">
                Input with type={"password"}
              </label>
              <br />
              <input type="password" id="input-password" />
            </p>
            <p>
              <label htmlFor="input-search">Input with type={"search"}</label>
              <br />
              <input type="search" id="input-search" />
            </p>
            <p>
              <label htmlFor="input-tel">Input with type={"tel"}</label>
              <br />
              <input type="tel" id="input-tel" />
            </p>
            <p>
              <label htmlFor="input-time">Input with type={"time"}</label>
              <br />
              <input type="time" id="input-time" />
            </p>
            <p>
              <label htmlFor="input-url">Input with type={"url"}</label>
              <br />
              <input type="url" id="input-url" />
            </p>
            <p>
              <label htmlFor="textarea">Textarea</label>
              <br />
              <textarea id="textarea"></textarea>
            </p>
          </form>
          <h4>Input States</h4>
          <form>
            <p>
              <label htmlFor="input-text-standard">Standard</label>
              <br />
              <input type="text" id="input-text-standard" />
            </p>
            <p>
              <label htmlFor="input-text-disabled">Disabled</label>
              <br />
              <input type="text" id="input-text-disabled" disabled={true} />
            </p>
            <p>
              <label htmlFor="input-text-invalid">Invalid</label>
              <br />
              <input
                type="text"
                id="input-text-invalid"
                required={true}
                value=""
              />
            </p>
          </form>
        </section>
        <section>
          <h3>Buttons</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "400px 400px 400px",
            }}
          >
            <p>
              <span>Button with button tag</span>
              <br />
              <button>Button</button>
            </p>
            <p>
              <span>Disabled button</span>
              <br />
              <button disabled={true}>Button</button>
            </p>
            <p>
              <label htmlFor="input-button">Input type={"button"}</label>
              <br />
              <input
                type="button"
                id="input-button"
                value="Input with type button"
              />
            </p>
            <p>
              <label htmlFor="input-reset">Input type={"reset"}</label>
              <br />
              <input type="reset" id="input-reset" value="Reset" />
            </p>
            <p>
              <label htmlFor="input-reset-disabled">Input type={"reset"}</label>
              <br />
              <input
                type="reset"
                id="input-reset-disabled"
                value="Reset"
                disabled={true}
              />
            </p>
            <p>
              <label htmlFor="input-submit">Input type={"submit"}</label>
              <br />
              <input type="submit" id="input-submit" value="Submit" />
            </p>
            <p>
              <label htmlFor="input-image">Input type={"image"}</label>
              <br />
              <input
                type="image"
                id="input-image"
                alt="Input"
                src="./static/input-image.png"
              />
            </p>
          </div>
        </section>
        <section>
          <h3>Radios &amp; Checkboxes</h3>
          <input type="radio" name="radio" id="radio-1" checked={true} />
          <label htmlFor="radio-1">Radio 1</label>
          <br />
          <input type="radio" name="radio" id="radio-2" />
          <label htmlFor="radio-2">Radio 2</label>
          <br />
          <input type="radio" name="radio" id="radio-3" />
          <label htmlFor="radio-3">Radio 3</label>
          <br />
          <input type="radio" name="radio" id="radio-4" disabled={true} />
          <label htmlFor="radio-4">Radio 4 (disabled)</label>
          <br />
          <input type="checkbox" id="checkbox-1" />
          <label htmlFor="checkbox-1">Checkbox</label>
          <br />
          <input type="checkbox" id="checkbox-2" checked={true} />
          <label htmlFor="checkbox-2">Checked Checkbox</label>
          <br />
          <input type="checkbox" id="checkbox-3" disabled={true} />
          <label htmlFor="checkbox-3">Disabled Checkbox</label>
        </section>
        <fieldset>
          <legend>Other Form Controls</legend>
          <p>
            <label htmlFor="select">Select</label>
            <br />
            <select id="select">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <optgroup label="Subgroup">
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
              </optgroup>
            </select>
          </p>
          <p>
            <label htmlFor="selectmultiple">Multiselect</label>
            <br />
            <select id="selectmultiple" multiple={false}>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
              <option value="6">Option 6</option>
              <optgroup label="Subgroup">
                <option value="7">Option 7</option>
                <option value="8">Option 8</option>
              </optgroup>
            </select>
          </p>
          <p>
            <label htmlFor="input-range">Input Range</label>
            <br />
            <input type="range" id="input-range" />
          </p>
          <p>
            <label htmlFor="input-color">Input Color</label>
            <br />
            <input type="color" id="input-color" />
          </p>
          <p>
            <label htmlFor="input-file">Input File</label>
            <br />
            <input type="file" id="input-file" />
          </p>
        </fieldset>
        <section>
          <h3>Elements in-line</h3>
          <p>
            <input type="text" aria-label="Test input" />
            <input type="button" value="Button" aria-label="Test button" />
          </p>

          <p>
            <input type="text" aria-label="Test input" />
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
            <input type="button" value="Button" aria-label="Test button" />
          </p>

          <p>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
            <input type="button" value="Button" aria-label="Test button" />
          </p>
        </section>
      </section>
    </>
  );
}
