<template>
    <v-sheet>
        <v-sheet class="mb-3">
            <v-btn @click="pdfgen()" dark color="primary" elevation="0" class="mr-2">
                <v-icon small left>mdi-monitor</v-icon>
                미리보기
            </v-btn>
            <v-btn @click="pdfgen('download')" dark color="pink" elevation="0">
                <v-icon small left>mdi-download</v-icon>
                다운로드
            </v-btn>
        </v-sheet>
        <v-sheet class="mb-2">
            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                <v-icon :dark="editor.isActive('paragraph')" small>$j-icon-paragraph</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'left' })" small>fas fa-align-left</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'center' })" small>fas fa-align-center</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'right' })" small>fas fa-align-right</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'justify' })" small>fas fa-align-justify</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon :dark="editor.isActive('bold')" small>fas fa-bold</v-icon>
            </button>
            <button @click="editor.chain().focus().setPositionX(cursorPosX()).run()" :class="{ 'is-active': editor.isActive('AutoOutdent') }">
                <v-icon :dark="editor.isActive('AutoOutdent')">$j-icon-auto-outdent</v-icon>
            </button>

            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()" :class="{ 'is-active': editor.isActive('table') }">
                <v-icon :dark="editor.isActive('table')">mdi-table</v-icon>
            </button>

            <template v-if="editor.isActive('table')">
                <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                    <v-icon class="far fa-trash-alt" dense></v-icon>
                </button>
                <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
                    <v-icon>mdi-table-column-plus-before</v-icon>
                </button>
                <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
                    <v-icon>mdi-table-column-plus-after</v-icon>
                </button>
                <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
                    <v-icon>mdi-table-column-remove</v-icon>
                </button>
                <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
                    <v-icon>mdi-table-row-plus-before</v-icon>
                </button>
                <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
                    <v-icon>mdi-table-row-plus-after</v-icon>
                </button>
                <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
                    <v-icon>mdi-table-row-remove</v-icon>
                </button>
                <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
                    <v-icon>mdi-table-merge-cells</v-icon>
                </button>
                <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
                    <v-icon>mdi-table-split-cell</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
                    <v-icon>mdi-tab</v-icon>
                </button>
            </template>
            <button @click="editor.chain().focus().undo().run()">
                <v-icon class="fas fa-undo" small></v-icon>
            </button>
            <button @click="editor.chain().focus().redo().run()">
                <v-icon class="fas fa-redo" small></v-icon>
            </button>
        </v-sheet>
        <div style="width: 210mm; border: 1px solid #dddddd" outlined elevation="4">
            <div style="padding: 20mm 20mm 15mm 20mm; line-height: 140%" ref="printArea" id="printArea">
                <!--여기부터 printArea-->
                <div>
                    <table class="title-table"
                           style="margin-bottom: 20pt"
                           data-pdfmake="{
                                    &quot;layout&quot;:&quot;noLine&quot;,
                                    &quot;widths&quot;:[120,&quot;*&quot;,120]
                                }"
                    >
                        <tr>
                            <td colspan="3" style="text-align: center; font-size: 10pt">
                                창작의 산실
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 120pt">
                                <img style="width: 55pt; margin: 13pt 0 0 0;"
                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAABJCAYAAACzSto0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTI5NDhBRUZCRjdFMTFFMzgzMjZFMDU2NDc2ODk2N0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTI5NDhBRjBCRjdFMTFFMzgzMjZFMDU2NDc2ODk2N0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Mjk0OEFFREJGN0UxMUUzODMyNkUwNTY0NzY4OTY3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5Mjk0OEFFRUJGN0UxMUUzODMyNkUwNTY0NzY4OTY3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PofeJeEAABB2SURBVHja7F0JlBbFEe6FDaJGwVsTRVS8o5J4R4kIeMQjoiBqPIInIShGZMEoBjxBTTjEE4W3qGCiGMFoVNRnxGCE4ImKmqigJKJBxQPUIG6+j79XVt7+3T1H/3/PTH3v1ZuF6b+nu6a6prq7qrqmoaFBCQQCQR5QIwpNIBCIQhMIBAJRaAKBQCAKTSAQCEShCQQCUWgCgUCQT4XWof1WbVN+9tdvLJj/SZwfbrNl+zVwWdMjX75C2z5r8rzWuLROod7PUO9XoQoD+rkuLi0sxT5GHxoCbp8Jy9D2/1WgnWvj8p0M6oMG8OfjGP1tg0sn0F6gH4C2Bm0K2hDUsrFuEMf756CFoHc0vQJ6ATQXz17abKMiGF21Edr9UcrMWwBqH4N5FOhHQft7fLGnguqb/PsC0NAU6j0Q9NdAlVk7XN5sIoDl0B00rUrNfBG0ZcJ+Nh1cn4LeBy3S8vg66GXQHAyuJPI+CXRUBhUalVlbRz5SaZ8IOg7U2eFDUwNqo4nKbo/VDRzU+aIe24/winfwddQO1GaQ6f09K7Mbwcj6AlrrdQ7KrFG5T8t4X5sOrs2bMwowuKjYHgDdC3mYJZO5bxTZd3EZBDrHVfk5ggqxo6a+oHXiVpIlZu6Ay3CPj5gJ+nUBhXQjXM5wLL4Pyv8k70sxeuo0GPQ0+vs86GQ9OyiyMjscl9dAF6eszFbHvLjLGi0yxMyWehrY2tMj3gX1rMQaS4A4LyJff1Mw/uwGug30DOSwYwEVWQ3oMvx5P+h7FXjky0nMvKxgIGhvT3UvB/WAMltUQGHlQvuvIv7sUPxutwIq/o7aYjutYP0eCxpSwee9FPeHtRkZdDT/L/X4iLOhzP5e0JkElVmbGL/jdOznBeQXd9jHc8YAmbmlAB+883HpF+EnX4DmqNIGzhtq1eYLvRLWAnEzYSvQ9npav3GhFBoYWqunmq08PWI8BHNcETUZeEshO9dQhEp+3zL3euH3F4F3bwXUpREglwV8LjjTMt0CtKu2vDaL+KzrubaG/v+jmXvD1bd3yZPgSJDJIpyt0ltXXr6afOwSoW7yfQzoz01dnmxTWVx2BnVRpV3hznrW+EqeLbSLQLt7qnt2xK9P3tBblbbQm8MMzZu5Ze5zTbMuxnTVJ2ZhME2Nqdyp1E4BnaWtCBvoZ1bPQb+6e0Gau6Kov72lyLtx++yA0cruT7eMchLHM0Av/L+k6Vr0ldbaYfj/t+M2OOg1NC1kvubu74GOAfO+LKh1VqsVUjmMAm8oaNMNZU7VQph5oK+0tgbo6dDtjj/bCXRsTuXjR9pyMoFjp1tabk6o5/2kdbUImKGttNnuw4qkt34vMO/fBbbOjtODt1nZAt2n/x5pqKO1ZcqaRcX2XxAttf6OPzkjp/JxisvsKbS155AtNHrm+9pJG4AXMaOomkyvXZhcL0Y3mUZNt6xp9NPOlrkC+j9WT7ls6IL+r5dDMfmp5f6HoOtDa3SLQAccwyIGe6p+ohbWIuMIVVqMbQ5LVJMFbb3OYRrY3CHtm1M+cf12kcMY+mHOPnjcjdzWUmw6ZOMLUWh2ZnIaQyfGlh6qfzbHgy8KLjTcG9fMLtUdoMWG35ynlwjyZqVxwXuCQ9Fdc9Z1xsvWWMr8K8SGh2ih0SN5Rw/1ckByE+DzImsyKJ7OuOxT5jbXFsc2M7DJsxsN1dLl4ZScsuwxhzIb5KzPLnGUK0Sh2QcbB9oAD1VzPYibAAvEOFsZXF4Od4NHC8vc43qJKSxsUE5jHd9KSQFkCcsdynQQhWaft9/uqU2DMFAfL7omA4+51nOIocgow/SLbi6TDL/lmssxOWRbETOgLnEoc5h2zBaFVgZXetL6d2Iw/l4Ms5Uw7WzOLOP17qTwNAbnkGcuwdiLc9ZnOrba/DPXC/F9BxEpAE1/gHL3+4kCxpOl4Sf0tCqFdSTFwiryeDtcehqKjLTVAYU3F/UwAV+3MkX2wP2uKPdYjga3S6qk5/KkzfD+VuA9UuYPsBS9WId/TQ2l7VVXaNqHqV7Zd1WighlHj9Y7VUlf8EO4PJRxOR1k4DHXiVyFcqRBoRFco8uFQtMpq063FKMl82QOLdOpDgqNM7y7wCemn7qhWqnZQ5tyXqVipOK2gJsAx4PBb8osc+XAZFZW0y7k6AjpjqnYXzXc74bn7Z4T1vV3WAa5J+7ZGIFjImipQznGel4Hetgh7jTfCg0MOEj5CW5mSMZ0UWXf4HxVPsiYeeQnuFbk4GhLZH4tjVNn/bE1ga4Ll+dRYPSZClGyeHAsvw6+ja5mfG81FRrTt4z3UO89DoJYJOuMJ++caShyi2u6lyag4/MHhvs98dwOGeYZp5kPKHumiavBu3k5Fp+rlVs6pqbWGmN7F4CH40DbF0mhcZdki5TrZOre3iHM5QPC2ap8OpwVeroQ9etNR9ubDEW4Vjcog4psLxAt+1tVKZGjCVwnHJpnwcF7pj/a0crNF68pWuuP6Dzwc1olz6DIkyMkp05Hx7A28mydccPlHJM1m8DZmIrQ5ID5Czx/s8D505IpqkB1oNnaGjnI4adPqFLK9uV5lyH0kWdtUCHFsUT5YfsZ+QX+zgGdCPJ6XmltTvhOi+wkMP+fosa+hT6g9Q33RyYQ9EUQzslUXGWKMLaTJ2hVcj2tP9rU3WGpg8STrrZT0Q/duZnTqiLl0WP0CPi6t7Zce8WshhtFjAkejrroczrBx4FEUU5OD3kaNwLMKdpJRDbro5WeKpRzDH0KPNsv4TMYlP2CoQh3/7bEc5ak1Kf5KuFBwwnAZJdMO/VIhd8jPwomh+ZpaFP3Cranp27P5gmrYhYTJkmYaNthj3Jyel6mnHQVWEMJvjXlU2Yv91FJHwBBpOPyYxZrKMvZTRisz80B5rvfrdLKLFBrbYq2bJlJ+tMEVTH1O3fXZ+kY7lSQF4W2RxoDNEfWWQvLVI+Wzr0pPc7G93NDjPkrg/+AOI3mYj8P1V0fA/gI0H0R/PSKoNQ+B12BP9tpxfZBwrE7EzJylU4LLwpNoy8XHUXcVoJ57rcx3B/D8JaUnvUg6HXD/U1U+XW20ECLlucEcH1sNnj0qYiSUbEt0YqN3gp9VPzj56iHuCv+KMbw+qLQVuFmMGTngltn3FkypQjiIB2folDTcrE52g5M4+tbIfBgHh6HN5/rV5qfArvFxsSgPPaOB6swbCqORctQK+6IbiQKrQT6W03JY477CDhED8pyuNWD5cEwmQ9NelaZA+PTAv0QnyhDDCDnBgYzSTQ4yhKn0zeIUouk3B4H0XeNjtV07YkaS83Dhx/Qmasjo5pfzcZt77QX83cA8UTrEwoqU6b02pxmXutBiJdBAG+yPJtren/w3PchLpkfdO49+pv1U3a/s1+CXlNuB6YIVskEd9jPAa8v0dNJ+kO6Kqk9VcmlKHJYZDUtNG7bXuqp7uPByLMLON38MS6dDEXuhaDN9/R4ZrQ1OZrSgfXQQAbbMhDdHQ7GP3uAbGnZh2c5lKvKvF4MGqQttmkRfto3zu5ntdc1GCt2rGWKFBcj6f0NZs4W6+wbbAqe1Ht8Pv3NNrJYaQ8FNuD+BJ7QLeMvhvFAy4IWaDdRUbH5zDNwu4PXJ6mSc/JaDj+7PCrPa6vcya/QwdPwJzOlpn3KE0MsuJ7WEc/5sADWGZ1cD7cU219TtdCZHud4H7MCG2yPoF3DlDlzRleUoQvH/aKeEvH6DvCRET2MmV3XUryrDnB/LQtTzsYOPqctNR/gdvKknB7esTouyEg7Q00tdI2yH802vCCy5HvM84PGTSKXzZlIURChvJxLo2jhiOC6zUU5t864i9grI83ltGPHAAcZ4wptGUK4A3eyqKR0rGLl5j4UKVNHi0A6xxOYT1f+TtgZhkGU5/WPOuXnYGYfqNHtDRHcIX3e9vGVMLvU4HJ4USS/0mDMZyi1mSpGbq4I/ZwMQfx+Dq0zpujpnbFmn6TTgodmNfCDeomlGMN9+okuSoXfrzpM8zeNUmdo3tvcpWP+JB8ZFbj7xgMdOucsjxWzMZgsBp51OqHCbeIHhEHM65W5zw0bHqxxfoD8nKatNNPO+4WQo/GQo49FLSUGw+ZMLjGRrOGgFBqTM0JQzsKfD3t6BP20mJ57QB4kAbxqq8zOhww/GaqdHCvdNm7NmzYq+qDMFaHtQNNK086gpuD9DfS0eYjoo8RI1bgIbsdGH24y0eMjzoPA9siJMHDqYwrzmloNZaZhy2i7dsBTt0YrzSZHmylBUtimlB9lWqE1CgvoPY/1T4Awbptx62xNzScTqpZSSTtS3mUpFmRqIb2WZksYSsfQ34o+SiTDnE7uYik2P/MKTR+h5TMxIB367slQnq7mcKae+pTDHPDxb1Vuoy3FN9t/eqAyyIgGmwPwmVn/MFYZ3ZU9YmBuHiw0ChTXMKZ4fAS/DDdk9MvGRfWBCZVJJd7hs7jMsBSrCzi10DDLfbrKXCl6KbZ1Nsyh6KO5UGgajND3uWjcW5/BmDUwkaXpCMCFoLsDaatt2ks3iOMzbKXxDNI9RUVFBtdYd7CUYdKASKFmQSs0niyk/O9IXsd4zwx92Rqze5pwLeNkA2nyfXyVljKDA8455mJFjBD95Cy/tSDOjM5wKD5ZLz/lxkKjUuOO58MeH8FMClxPa5OhdQdT6NBSVcoHF8r7c8loy5CiwzJspXWB/BycQ+VzE+gyfXZpTQr18fyAp5Xb+jijhy6J+oysBNrSN83nAcJbg+ozkpnUFoQ+Ia1j41JEvSqlFjIh5GMIXay0q3KY2barKvnaMYHEu+jfbUz/w40Q174yezToWBDTMzGrzu6ucg45fidqgzOR5x0dexsMuUD5C41qtHzouf67gL+YjEc1rdfQ3WBMgO+PDtPjLFPl/VBmPx0CF5yVhrbRStvbUIzLFsySPDkn1hkVVrsm/8XDbk5Wq4Lz+U6p6LgLybTmdLNium0u9jNCZBvNk71U9MOcuRkYK7Nylk5O57ybi8c+83mNoOBCgJ8MlAc2K4bHrb0RaNvHqtJ6aK3F+jwyYCvtQUsZTs+m+DgRvAqgAmtluE+H7k7KnCE5DujUfKL2BYyMzOR20h3kjuSXHh/Dbfg/Qig3CfCLyS9dF0uxkQG/P+682hxtjwj11C7HtTQuXfTJyXSzGifUc3bUI8kHIVPJ6tBRBrIO9fwYhrPciYEVWjoem3X2DPgzI/BX6BK5EHKiymEOZYbk5NSxSio0jusukN+6pOfFZjH7JnMoPeP5GQcqfwe4xLHOePjtUSkoi2p/kObgYoteOAH9bZdhK21jFWYWkaioxK7/PNCpoJ15/F0aFWZOoWn/Kvqw+PazYoqYwwPpNtNWm3aVXOIms2Kl0TIeGHD7Xay0uiSH5QYyzm7RsxWeej9JlRb+0wCTJXDjqhOesROoPk2fyZqGBre1tw7tt2qbMs++Rkc+SWC1rKP8Z2ldjjYuDcBCW9fy8QminY59qXH4+q9o7jBkBz4srUSuO522yYZU2qJDhNYM4d2jLYxO2VeVsshy1kBPf2bL2HC1onx3i0Hvq1JwOdPr8xDop/RaaiS46qhICk0gEAhChyg0gUAgCk0gEAhEoQkEAoEoNIFAIBCFJhAIRKEJBAKBKDSBQCAQhSYQCARJ8H8BBgA+7yuLM+e27wAAAABJRU5ErkJggg=="
                                >
                            </td>
                            <td style="height: 40pt; font-size: 17pt; text-align: center;
                                       margin-top:12pt; padding-top: 12pt; font-weight: bold">
                                한국예술종합학교 산학협력단
                            </td>
                            <td style="width: 120pt">
                            </td>
                        </tr>
                    </table>
                    <table class="receiver-table"
                           data-pdfmake="{
                                    &quot;layout&quot;:&quot;noLine&quot;,
                                    &quot;widths&quot;:[40, 442]
                                }"
                    >
                        <tr>
                            <td style="width: 40pt; padding-bottom: 3pt; margin-bottom: 6pt; font-size: 11.9pt;">수신</td>
                            <td style="padding-bottom: 3pt; margin-bottom: 6pt; font-size: 11.9pt;">산학협력단장</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 3pt; margin-bottom: 6pt; font-size: 11.9pt;">(경유)</td>
                            <td style="padding-bottom: 3pt; margin-bottom: 6pt; font-size: 11.9pt;">전략기획팀</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 0pt; margin-bottom: 0pt; font-size: 11.9pt;">제목</td>
                            <td style="padding-bottom: 0pt; margin-bottom: 0pt; font-size: 11.9pt;">
                                2021 한국예술종합학교 산학협력단 운영 계획 및 예산안 수립 계획
                            </td>
                        </tr>
                    </table>
                    <hr style="border: none; height: 0.1pt;
                               background: black; margin: 2pt 0 10pt 0"
                        data-pdfmake="{
                            &quot;left&quot;:0,
                            &quot;width&quot;:482,
                            &quot;thickness&quot;:0.1,
                            &quot;color&quot;:&quot;black&quot;,
                            &quot;margin&quot;:[0,0,0,10]
                        }"
                    >
                    <div class="editor">

                        <editor-content :editor="editor" v-model="content"></editor-content>

                    </div>
                </div>

                <div ref="footerSection">
                    <!--여기부터 footerSection-->
                    <div>
                        <hr style="border: none; height: 7pt;
                                   background: #AAAAAA; margin: 2pt 0 4pt 0"
                            data-pdfmake="{
                                &quot;left&quot;:0,
                                &quot;width&quot;:482,
                                &quot;thickness&quot;:7,
                                &quot;color&quot;:&quot;#AAAAAA&quot;,
                                &quot;margin&quot;:[0,2,0,9]
                            }"
                        >
                        <!--결재-->
                        <confirm-list style="margin-top: 5pt" :items="confirmList" type="formal"></confirm-list>

                        <!--협조자-->
                        <confirm-list style="margin-top: 0pt" v-if="helpList.length" name="협조자" :items="helpList" type="list"></confirm-list>

                        <!--병렬협조자-->
                        <confirm-list style="margin-top: 0pt" v-if="parallelList.length" name="병렬협조자" :items="parallelList" type="list"></confirm-list>
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,0,0,0]}"
                         style="font-size: 9pt; margin-top: 0pt; line-height: 1.2">
                        시행 전략기획팀2021-143
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,4,0,0]}"
                         style="font-size: 9pt; margin-top: 5pt; line-height: 1.2">
                        우 02789 서울특별시 성북구 화랑로 32길 146-37 창조관 2층 208호 / research.karts.ac.kr
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,4,0,0]}"
                         style="font-size: 9pt; margin-top: 5pt; line-height: 1.2">
                        전화번호 02-746-9051 팩스번호: 02-746-9069 / jhoon@karts.ac.kr
                    </div>
                </div>
            </div>
        </div>
        <v-sheet class="mt-3">
            <v-btn @click="pdfgen()" dark color="primary" elevation="0" class="mr-2">
                <v-icon small left>mdi-monitor</v-icon>
                미리보기
            </v-btn>
            <v-btn @click="pdfgen('download')" dark color="pink" elevation="0">
                <v-icon small left>mdi-download</v-icon>
                다운로드
            </v-btn>
        </v-sheet>
        <!--
        <v-btn color="primary" @click="nextStep(2)">
            <v-icon left>mdi-card-bulleted-outline</v-icon>문서관리카드
        </v-btn>
        -->
    </v-sheet>
</template>
<script>
    import pdfMake from '@/assets/pdfmake.js'
    import htmlToPdfmake from "html-to-pdfmake"
    import ConfirmList from "@/components/ConfirmList.vue"

    import {Extension, mergeAttributes} from '@tiptap/core'
    import { Editor, EditorContent } from '@tiptap/vue-2'
    import { defaultExtensions } from '@tiptap/starter-kit'
    import ppp from '@tiptap/extension-paragraph'
    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'
    import TextAlign from '@tiptap/extension-text-align'
    import { position, /* offset */ } from 'caret-pos'

    const AutoOutdent = Extension.create({
        defaultOptions: {
            types: ['paragraph'],
            positionX: String,
            defaultPositionX: 0,
        },
        addGlobalAttributes() {
            return [
                {
                    types: [
                        'paragraph',
                    ],
                    attributes: {
                        positionX: {
                            default: '0',
                            renderHTML: attributes => ({
                                style: `margin-left: ${attributes.positionX}px; text-indent: -${attributes.positionX}px`,
                                "data-pdfmake": `{&quot;leadingIndent&quot;:-${attributes.positionX*0.75*1.01},
                                                 &quot;margin&quot;:[${attributes.positionX*0.75*1.01}, 0, 0, 0],
                                                 &quot;preserveLeadingSpaces&quot;:true}` //*1.01은 실측 결과 가중치
                            }),
                            parseHTML: element => ({
                                marginLeft: element.style.marginLeft || '0',
                                textIndent: element.style.textIndent || '0',
                            }),
                        },
                    },
                },
            ]
        },
        addCommands() {
            return {
                setPositionX: ( value ) => ({ commands }) => {
                    // console.log("this.editor.state", this.editor.state)
                    return this.options.types.every(type => commands.updateNodeAttributes(type, { positionX: value }))
                },
                /*
                unsetPositionX: () => ({ commands }) => {
                    return this.options.types.every(type => commands.resetNodeAttributes(type, 'positionX'))
                },*/
            }
        },
        addKeyboardShortcuts() {
            return {
                'Alt-q': () => {
                    console.log("단축키 작동")
                    let posX = position(window.getSelection().anchorNode.parentElement).left //document.querySelector('.ProseMirror')
                    this.editor.commands.updateNodeAttributes('paragraph', {positionX: posX})
                }
            }
        },
    })

    // const PdfTableCell = TableCell.extend({
    //     renderHTML({ HTMLAttributes }) {
    //         return ['td', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'intd'}), 0]
    //     },
    // })

    const ParagraphInTd = ppp.extend({
        renderHTML({ HTMLAttributes }) {
            let parentTagName = window.getSelection().anchorNode.parentElement.parentElement.tagName
            let classObj = {}
            // console.log("parentTagName", parentTagName)
            if (parentTagName === 'TD') {
                classObj = { class: 'intd' }
                // console.log(classObj)
            }
            console.log("classObj", classObj)
            return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, classObj), 0]
        }
    })

    export default {
        components: {
            ConfirmList,
            EditorContent,
        },
        data () {
            return {
                confirmList: [
                    { role: "직원", name: "최형준" },
                    { role: "전략기획팀장", name: "마진욱" },
                    { role: "부단장", name: "여종훈" },
                    { role: "단장", name: "이정민", kind: "결재", date: "2021.11.20."}
                ],
                helpList: [
                ],
                parallelList: [
                ],
                editor: null,
                content: ""
            }
        },
        methods: {
            pdfgen(flag) {

                let defaultStyles = {
                    'p': {
                        // lineHeight: 1.4,
                        fontSize: 11.7
                        // margin: [0,0,0,0]
                    },
                    'table': {
                        marginBottom: 5
                    }
                }

                let styles = {
                    'intd': {
                        lineHeight: 5,
                    }
                }
                // console.log("this.$refs.printArea.innerHTML", this.$refs.printArea.innerHTML)
                let html = this.$refs.printArea.innerHTML.replace(/<div data-v-[a-z0-9]*=""\svalue="((.|\n)*)>">/g, "")
                html = html.replace(/&nbsp;/g, " ")
                html = html.replace(/&amp;/g, "&")
                // html = html.replace(/<p/g, "<p data-pdfmake=\"{&quot;leadingIndent&quot;:-20,&quot;margin&quot;:[20, 0, 0, 0]}\" ")
                html = html.replace(/colwidth="([0-9]+)"/g, this.calcWidth)
                html = html.replace(/<table\sstyle="(width|min-width):\s([0-9]+)px;"/g, "<table data-pdfmake=\"{&quot;layout&quot;:&quot;padding&quot;}\" style=\"$1: $2px\"")

                console.log("html", html)

                let content = htmlToPdfmake(html, {
                    tableAutoSize: true,
                    defaultStyles: defaultStyles
                })

                let footer = htmlToPdfmake(this.$refs.footerSection.innerHTML, {
                    tableAutoSize: true,
                    defaultStyles: defaultStyles
                })
                footer[0].headlineLevel = "footer"
                footer.push({
                    text: "1",
                    headlineLevel: "end",
                    fontSize: 0.1
                })

                console.log("content", content)

                let retThin = function () { return 0.1 }
                let retZero = function () { return 0 }
                let ret3 = function () { return 3 }
                let retBalck = function () { return 'black' }

                pdfMake.tableLayouts = {
                    padding: {
                        hLineWidth: retThin,
                        vLineWidth: retThin,
                        hLineColor: retBalck,
                        vLineColor: retBalck,
                        paddingLeft: ret3,
                        paddingRight: ret3,
                        paddingTop: ret3,
                        paddingBottom: ret3
                    },
                    thinLine: {
                        hLineWidth: retThin,
                        vLineWidth: retThin,
                        hLineColor: retBalck,
                        vLineColor: retBalck,
                        paddingLeft: retZero,
                        paddingRight: retZero,
                        paddingTop: retZero,
                        paddingBottom: retZero
                    },
                    noLine: {
                        hLineWidth: retZero,
                        vLineWidth: retZero,
                        paddingLeft: retZero,
                        paddingRight: retZero,
                        paddingTop: retZero,
                        paddingBottom: retZero
                    }
                }

                //단위: point
                let pageHeight = 841.89  //297mm pageWidth = 595.276(210mm)
                let leftMargin = 56.7    //20mm
                let topMargin = 56.7     //20mm
                let rightMargin = 56.7   //20mm
                let bottomMargin = 42.5  //15mm


                //--1. footerHeight 구하기 (Page Break 기능을 이용함)
                let footerHeight = 0

                /*
                 * 다음 노드가 동일 페이지에 있을 경우 followingNodesOnPage 배열에 나타나며
                 * 다음 페이지에 있을 경우는 nodesOnNextPage 배열에 나타남
                 */
                let extractFooterHeight = function(currentNode, followingNodesOnPage) {
                    if (currentNode.headlineLevel === 'footer') {
                        let footerTop = currentNode.startPosition.top
                        //풋터가 한페이지에 꽉차거나 넘쳐서 마지막 노드가 다음 페이지에 나타나는 경우 todo: 수정 필요
                        if (followingNodesOnPage.length <= 0) {
                            footerHeight = 0
                        } else { //한페이지 이내
                            footerHeight = followingNodesOnPage[followingNodesOnPage.length-1].startPosition.top - footerTop + 5 //+5는 여분
                        }
                    }
                }
                const prePdf1 = pdfMake.createPdf({
                    content: footer,
                    pageBreakBefore: extractFooterHeight,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                })
                prePdf1.getStream();

                console.log("footerHeight", footerHeight)

                //--2. footerInterPages (풋터가 2페이지 이상 걸쳐 있는지 여부) 구하기 (Page Break 기능을 이용함)
                let footerInterPages = false

                let extractFooterInterPages = function(currentNode) {
                    // console.log("currentNode", currentNode)
                    if (currentNode.headlineLevel === 'footer' && currentNode.pageNumbers.length > 1) {
                        footerInterPages = true
                    }
                }

                content[content.length-1].headlineLevel = "footer"
                //console.log("content2", content)

                //console.log("content(여기):", content)

                const prePdf2 = pdfMake.createPdf({
                    content: content,
                    pageBreakBefore: extractFooterInterPages,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                });
                prePdf2.getStream();

                //console.log("footerInterPages", footerInterPages)

                //--3. PDF 생성
                let pageBreaker = function(currentNode) {
                    //노드가 풋터이면서, 페이지에 걸쳐 있는 경우는 페이지 나눔
                    if (currentNode.headlineLevel === 'footer' && footerInterPages === true) {
                        return true
                    }
                }

                // console.log("capture", html)

                let finalContent = htmlToPdfmake(html, {
                    tableAutoSize: true,
                    defaultStyles: defaultStyles
                })
                finalContent[finalContent.length-1].headlineLevel = "footer"
                finalContent[finalContent.length-1].absolutePosition = { x: leftMargin, y: pageHeight - footerHeight - bottomMargin }

                //console.log("content3", content)
                /*
                content.push({
                    text: footer,
                    headlineLevel: "footer",
                    absolutePosition: { x: leftMargin, y: pageHeight - footerHeight - bottomMargin}
                })
                 */

                //console.log("content(여기2):", content)

                let docDefinition = {
                    content: finalContent,
                    pageBreakBefore: pageBreaker,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                }

                console.log("docDefinition", docDefinition)
                if (flag == "download") {
                    pdfMake.createPdf(docDefinition).download("optionalName.pdf")
                } else {
                    pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc) {
                        document.getElementById('pdfId').src = outDoc;
                    })
                }
            },
            calcWidth(all, letter) {
                return "style=\"width:" + ( letter * 1 - 8 ) +"px\""
            },
            cursorPosX() {
                //커서가 포함된 element 구하기
                let ele = window.getSelection().anchorNode.parentElement //window.getSelection().anchorNode.parentElement //document.querySelector('.ProseMirror')
                ele.contentEditable = "true" //"caret-pos(v.2.0.0)"는 이 값이 false인 element는 다루지 않음

                //caret-pos는 text-indent룰 무시하고 margin을 기준으로만 위치를 계산하므로 text-indent를 따로 얻어 결과 값을 보정하기로 함
                let numArray = /[+-]?\d+\.?\d+/.exec(ele.style.textIndent)
                let addMargin = numArray ? Math.abs(numArray[0] * 1) : 0

                //커서 위치 구하기(by caret-pos)
                let cursorPos = position(ele); // { left: 15, top: 30, height: 20, pos: 15 }
                // this.cursorOff = offset(this.input); // { left: 15, top: 30, height: 20 }

                return cursorPos.left + addMargin
            }
        },
        watch: {
            value(value) {
                const isSame = this.editor.getHTML() === value

                if (isSame) {
                    return
                }

                this.editor.commands.setContent(this.value, false)
            },
        },
        mounted() {
            this.editor = new Editor({
                extensions: [
                    ...defaultExtensions().filter(
                        extension => extension.config.name !== 'dropcursor'
                            && extension.config.name !== 'italic'
                            && extension.config.name !== 'code'
                            && extension.config.name !== 'codeBlock'
                            && extension.config.name !== 'heading'
                            && extension.config.name !== 'hardBreak'
                            && extension.config.name !== 'strike'
                            && extension.config.name !== 'blockquote'
                            && extension.config.name !== 'horizontalRule'
                            && extension.config.name !== 'bulletList'
                            && extension.config.name !== 'orderedList'
                            && extension.config.name !== 'listItem'
                            // && extension.config.name !== 'paragraph'
                    ),
                    Table.configure({
                        resizable: true,
                    }),
                    TableRow,
                    TableCell,
                    TableHeader,
                    TextAlign,
                    AutoOutdent,
                    // PdfTableCell,
                    ParagraphInTd
                ],
                content: this.value,
                autofocus: true,
                editable: true,
                injectCSS: false,
            })

            this.editor.on('update', () => {
                this.content = this.editor.getHTML()
                // this.$emit('input', this.editor.getHTML())
            })
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>
<style scoped>
    .title-table,
    .receiver-table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .title-table td,
    .receiver-table td,
    .confirm-table td {
        /*border: 1px solid blue;*/
        vertical-align: top;
    }
    .title-table,
    .receiver-table {
        width: 100%;
    }
    .title-table {
        margin-bottom: 20pt;
    }
    .editor {
        padding-bottom: 10pt;
    }
</style>
<style>
    #printArea * {
        font-family: "Nanum Gothic Coding";
    }
    button,
    button.is-active {
        margin-right: 0.2rem;
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    }
    button.is-active {
        border-radius: 5px;
        background: #555555;
        color: white;
    }
    button .v-icon svg {
        fill: #767676;
    }
    button.is-active svg {
        fill: white;
    }
</style>
<style lang="scss">
    /* Basic editor styles */
    .ProseMirror {
        margin: 0;
        min-height: 20rem;
        font-family: 'Nanum Gothic Coding';

        > * + * {
            margin-top: 0;
        }

        p {
            line-height: 1.6;
            font-size: 11.7pt;
            margin-bottom: 0;
        }

    }

    /* Table-specific styling */
    .ProseMirror {
        table {
            border-collapse: collapse;
            table-layout: fixed;
            /*width: 10rem;*/
            margin: 3pt 0 3pt 0;
            overflow: hidden;

            td,
            th {
                /*min-width: 1em;*/
                /*width: 10rem;*/
                border: 1px solid grey;
                padding: 1pt 2pt;
                vertical-align: middle;
                box-sizing: border-box;
                position: relative;

                > * {
                    margin-bottom: 0;
                }
            }

            th {
                font-weight: bold;
                text-align: left;
                background-color: #f1f3f5;
            }

            .selectedCell:after {
                z-index: 2;
                position: absolute;
                content: "";
                left: 0; right: 0; top: 0; bottom: 0;
                background: rgba(200, 200, 255, 0.4);
                pointer-events: none;
            }

            .column-resize-handle {
                position: absolute;
                right: -2px;
                top: 0;
                bottom: -2px;
                width: 4px;
                background-color: #adf;
                pointer-events: none;
            }
        }
    }

    .tableWrapper {
        overflow-x: auto;
    }

    .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    }
    .ProseMirror-focused:focus {
        outline: 0;
    }
</style>
